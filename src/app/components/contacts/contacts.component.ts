import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { ContactService } from '../../services/contact.service';
import { SwalService } from '../../services/swal.service';
import { ContactModel } from '../../models/contact.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { LeadSourceService } from '../../services/lead-source.service';
import { SalutationService } from '../../services/salutation.service';
import { ContactEnumsModel } from '../../models/contact.enums.model';
import { DialogCreateContactComponent } from './dialog-create-contact/dialog-create-contact.component';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [SharedModule, MaterialsModule, RouterLink],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent implements OnInit {
  contacts: ContactModel[] = [];
  contactEnums: ContactEnumsModel = new ContactEnumsModel();

  createModel: ContactModel = new ContactModel();
  updateModel: ContactModel = new ContactModel();

  dataSource = new MatTableDataSource<ContactModel>();

  displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'phone',
    'accountName',
    'update',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  readonly dialog = inject(MatDialog);

  constructor(
    private contactService: ContactService,
    private swal: SwalService,
    private auth: AuthService,
    private leadSourceService: LeadSourceService,
    private salutationService: SalutationService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.createModelInit();
    this.getAll();
    this.getAllEnums();
  }

  createModelInit() {
    const contactOwner = this.auth.user;

    this.createModel.contactOwner = contactOwner;
    this.createModel.contactOwnerId = contactOwner.id;
    this.createModel.createdById = contactOwner.id;
    this.createModel.modifiedById = contactOwner.id;
  }

  getAll() {
    this.contactService.getAll((res) => {
      this.contacts = [...res];
      this.dataSource = new MatTableDataSource(res);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  create() {
    this.createModelInit();
    this.contactService.create(this.createModel, (res, message) => {
      this.contacts.push(res);
      this.dataSource.data = this.contacts;
      this.createModel = new ContactModel();

      if (message) {
        this.swal.callToast(message);
      }
    });
  }

  update() {
    this.updateModel.modifiedById = this.auth.user.id;
    this.updateModel.modifiedDate = new Date().toString();

    this.contactService.update(this.updateModel, (res, message) => {
      const index = this.contacts.findIndex((c) => c.id === res.id);
      if (index !== -1) {
        this.contacts[index] = res;
        this.dataSource.data = this.contacts;
      }

      if (message) {
        this.swal.callToast(message, 'info');
      }
    });
  }

  deleteById(model: ContactModel) {
    this.swal.callSwal(
      'İrtibatı Sil?',
      `${model.firstName} ${model.lastName} irtibatı silmek istiyor musunuz?`,
      () => {
        this.contactService.deleteById(model.id, (res, message) => {
          this.contacts = this.contacts.filter((a) => a.id !== res.id);
          this.dataSource.data = this.contacts;
          if (message) {
            this.swal.callToast(message, 'info');
          }
        });
      }
    );
  }

  getAllEnums() {
    this.getAllLeadSources();
    this.getAllSalutations();
    this.getAllAccounts();
  }

  getAllLeadSources() {
    this.leadSourceService.getAll((res) => {
      this.contactEnums.leadSources = [...res];
    });
  }

  getAllSalutations() {
    this.salutationService.getAll((res) => {
      this.contactEnums.salutations = [...res];
    });
  }

  getAllAccounts() {
    this.accountService.getAll((res) => {
      this.contactEnums.accounts = [...res];
    });
  }

  openCreateContactDialog() {
    this.contactEnums.model = this.createModel;
    const dialogRef = this.dialog.open(DialogCreateContactComponent, {
      width: '1000px',
      data: this.contactEnums,
      maxWidth: '1000px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createModel = { ...this.createModel, ...result };
        this.create();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

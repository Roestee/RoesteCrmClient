import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { SwalService } from '../../services/swal.service';
import { AccountModel } from '../../models/account.model';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from '../../modules/shared.module';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { IndustryService } from '../../services/industry.service';
import { AccountEnumsModel } from '../../models/account.enums.model';
import { AccountTypeService } from '../../services/account-type.service';
import { RouterLink } from '@angular/router';
import { DialogCreateAccountComponent } from './dialog-create-account/dialog-create-account.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [SharedModule, MaterialsModule, RouterLink],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit {
  accounts: AccountModel[] = [];
  accountEnums: AccountEnumsModel = new AccountEnumsModel();

  createModel: AccountModel = new AccountModel();
  updateModel: AccountModel = new AccountModel();

  dataSource = new MatTableDataSource<AccountModel>();

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'customerType',
    'update',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  readonly dialog = inject(MatDialog);

  constructor(
    private accountService: AccountService,
    private swal: SwalService,
    private auth: AuthService,
    private industryService: IndustryService,
    private accountTypeService: AccountTypeService
  ) {}

  ngOnInit(): void {
    this.createModelInit();
    this.getAll();
    this.getAllEnums();
  }

  createModelInit() {
    const accountOwner = this.auth.user;

    this.createModel.accountOwner = accountOwner;
    this.createModel.accountOwnerId = accountOwner.id;
    this.createModel.createdById = accountOwner.id;
    this.createModel.modifiedById = accountOwner.id;
  }

  getAll() {
    this.accountService.getAll((res) => {
      this.accounts = [...res];
      this.dataSource = new MatTableDataSource(res);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  create() {
    this.createModelInit();
    this.accountService.create(this.createModel, (res, message) => {
      this.accounts.push(res);
      this.dataSource.data = this.accounts;
      this.createModel = new AccountModel();

      if (message) {
        this.swal.callToast(message);
      }
    });
  }

  update() {
    this.updateModel.modifiedById = this.auth.user.id;
    this.updateModel.modifiedDate = new Date().toString();

    this.accountService.update(this.updateModel, (res, message) => {
      const index = this.accounts.findIndex((a) => a.id === res.id);
      if (index !== -1) {
        this.accounts[index] = res;
        this.dataSource.data = this.accounts;
      }
      if (message) {
        this.swal.callToast(message, 'info');
      }
    });
  }

  deleteById(model: AccountModel) {
    this.swal.callSwal(
      'Hesabı Sil?',
      `${model.name} hesabı silmek istiyor musunuz?`,
      () => {
        this.accountService.deleteById(model.id, (res, message) => {
          this.accounts = this.accounts.filter((a) => a.id !== res.id);
          this.dataSource.data = this.accounts;
          if (message) {
            this.swal.callToast(message, 'info');
          }
        });
      }
    );
  }

  getAllEnums() {
    this.getAllIndustries();
    this.getAllAccountTypes();
  }

  getAllIndustries() {
    this.industryService.getAll((res) => {
      this.accountEnums.industries = [...res];
    });
  }

  getAllAccountTypes() {
    this.accountTypeService.getAll((res) => {
      this.accountEnums.accountTypes = [...res];
    });
  }

  openCreateAccountDialog() {
    this.accountEnums.model = this.createModel;
    const dialogRef = this.dialog.open(DialogCreateAccountComponent, {
      width: '1000px',
      data: this.accountEnums,
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

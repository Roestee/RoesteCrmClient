import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { LeadModel } from '../../models/lead.model';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LeadService } from '../../services/lead.service';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { MatPaginator } from '@angular/material/paginator';
import { LeadStatusService } from '../../services/lead-status.service';
import { LeadSourceService } from '../../services/lead-source.service';
import { SalutationService } from '../../services/salutation.service';
import { RatingService } from '../../services/rating.service';
import { IndustryService } from '../../services/industry.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateLeadComponent } from './dialog-create-lead/dialog-create-lead.component';
import { DialogUpdateLeadComponent } from './dialog-update-lead/dialog-update-lead.component';
import { LeadListModel } from '../../models/lead.list.model';
import { DatePipe } from '@angular/common';
import { LeadEnumsModel } from '../../models/lead.enums.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [SharedModule, MaterialsModule, DatePipe, RouterLink],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css',
})
export class LeadsComponent implements OnInit {
  leads: LeadModel[] = [];
  leadEnums: LeadEnumsModel = new LeadEnumsModel();

  createModel: LeadModel = new LeadModel();
  updateModel: LeadModel = new LeadModel();

  dataSource = new MatTableDataSource<LeadListModel>();

  displayedColumns: string[] = [
    'id',
    'fullName',
    'company',
    'city',
    'email',
    'leadStatusName',
    'createdDate',
    'update',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  readonly dialog = inject(MatDialog);

  constructor(
    private leadService: LeadService,
    private leadsStatusService: LeadStatusService,
    private leadSourceService: LeadSourceService,
    private salutationService: SalutationService,
    private ratingService: RatingService,
    private industryService: IndustryService,
    private swal: SwalService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.createModelInit();
    this.getAll();
    this.getAllEnums();
  }

  createModelInit() {
    const leadOwner = this.auth.user;

    this.createModel.leadOwner = leadOwner;
    this.createModel.leadOwnerId = leadOwner.id;
    this.createModel.createdByUserId = leadOwner.id;
    this.createModel.modifiedByUserId = leadOwner.id;
  }

  setDataSource() {
    this.dataSource.data = this.leads.map(
      (l) =>
        new LeadListModel(
          l.id,
          `${l.firstName} ${l.lastName}`,
          l.company,
          l.address?.city || '',
          l.email,
          l.leadStatus?.name || '',
          l.createdDate
        )
    );
  }

  getAll() {
    this.leadService.getAll((res) => {
      this.leads = [...res];
      this.dataSource = new MatTableDataSource(
        this.leads.map(
          (l) =>
            new LeadListModel(
              l.id,
              `${l.firstName} ${l.lastName}`,
              l.company,
              l.address?.city || '',
              l.email,
              l.leadStatus?.name || '',
              l.createdDate
            )
        )
      );

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  create() {
    this.createModelInit();
    this.leadService.create(this.createModel, (res, message) => {
      this.createModel;
      this.leads.push(res);
      this.setDataSource();
      this.createModel = new LeadModel();
      if (message) {
        this.swal.callToast(message);
      }
    });
  }

  update() {
    this.updateModel.modifiedByUserId = this.auth.user.id;
    this.updateModel.modifiedDate = new Date().toString();

    this.leadService.update(this.updateModel, (res, message) => {
      const index = this.leads.findIndex((l) => l.id === res.id);
      if (index !== -1) {
        this.leads[index] = res;
        this.setDataSource();
      }
      if (message) {
        this.swal.callToast(message, 'info');
      }
    });
  }

  deleteById(model: LeadModel) {
    this.swal.callSwal(
      'Müşteriyi Sil?',
      `${model.firstName} ${model.lastName} müşteriyi silmek istiyor musunuz?`,
      () => {
        this.leadService.deleteById(model, (res, message) => {
          this.leads = this.leads.filter((l) => l.id !== res.id);
          this.setDataSource();
          if (message) {
            this.swal.callToast(message, 'info');
          }
        });
      }
    );
  }

  getAllEnums() {
    this.getAllLeadStatuses();
    this.getAllLeadSources();
    this.getAllSalutations();
    this.getAllRatings();
    this.getAllIndustries();
  }

  getAllLeadStatuses() {
    this.leadsStatusService.getAll((res) => {
      this.leadEnums.leadStatuses = [...res];
    });
  }

  getAllLeadSources() {
    this.leadSourceService.getAll((res) => {
      this.leadEnums.leadSources = [...res];
    });
  }

  getAllSalutations() {
    this.salutationService.getAll((res) => {
      this.leadEnums.salutations = [...res];
    });
  }

  getAllRatings() {
    this.ratingService.getAll((res) => {
      this.leadEnums.ratings = [...res];
    });
  }

  getAllIndustries() {
    this.industryService.getAll((res) => {
      this.leadEnums.industries = [...res];
    });
  }

  openCreateLeadDialog() {
    this.leadEnums.model = this.createModel;
    const dialogRef = this.dialog.open(DialogCreateLeadComponent, {
      width: '1000px',
      data: this.leadEnums,
      maxWidth: '1000px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createModel = { ...this.createModel, ...result };
        this.create();
      }
    });
  }

  openUpdateLeadDialog(lead: LeadModel) {
    this.leadEnums.model = this.leads.find((l) => l.id === lead.id) ?? lead;
    const dialogRef = this.dialog.open(DialogUpdateLeadComponent, {
      width: '1000px',
      data: this.leadEnums,
      maxWidth: '1000px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateModel = { ...this.updateModel, ...result };
        this.update();
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

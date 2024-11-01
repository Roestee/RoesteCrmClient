import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { SwalService } from '../../services/swal.service';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from '../../services/lead.service';
import { LeadEnumsModel } from '../../models/lead.enums.model';
import { IndustryService } from '../../services/industry.service';
import { LeadSourceService } from '../../services/lead-source.service';
import { LeadStatusService } from '../../services/lead-status.service';
import { RatingService } from '../../services/rating.service';
import { SalutationService } from '../../services/salutation.service';
import { LeadStatusModel } from '../../models/lead.status.model';
import { LeadModel } from '../../models/lead.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-lead-details',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './lead-details.component.html',
  styleUrl: './lead-details.component.css',
})
export class LeadDetailsComponent implements OnInit {
  leadId: string = '';
  leadEnums: LeadEnumsModel = new LeadEnumsModel();
  updateModel: LeadModel = new LeadModel();
  isReadonly: boolean = true;

  constructor(
    private leadService: LeadService,
    private leadsStatusService: LeadStatusService,
    private leadSourceService: LeadSourceService,
    private salutationService: SalutationService,
    private ratingService: RatingService,
    private industryService: IndustryService,
    private swal: SwalService,
    private activated: ActivatedRoute,
    private auth: AuthService
  ) {
    this.activated.params.subscribe((res) => {
      this.leadId = res['id'];
      this.leadService.getById(this.leadId, (res) => {
        this.leadEnums.model = res;
        this.updateModel = { ...res };
      });
    });
  }

  ngOnInit(): void {
    this.getAllEnums();
  }

  submitUpdateForm(form: NgForm) {
    if (form.valid) {
      this.update();
    }

    this.toggleReadonly();
  }

  changeLeadStatus(leadStatus: LeadStatusModel) {
    this.updateModel.leadStatusId = leadStatus.id;
    this.updateModel.leadStatus = leadStatus;

    this.update();
  }

  update() {
    this.updateModel.modifiedByUserId = this.auth.user.id;
    this.updateModel.modifiedDate = new Date().toString();

    this.leadService.update(this.updateModel, (res, message) => {
      this.leadEnums.model = res;
      this.updateModel = { ...res };
      if (message) {
        this.swal.callToast(message, 'info');
      }
    });
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

  isLeadStatusCompleted(leadStatus: LeadStatusModel): boolean {
    var index = this.leadEnums.leadStatuses.findIndex(
      (ls) => ls.id === leadStatus.id
    );
    var currentIndex = this.leadEnums.leadStatuses.findIndex(
      (ls) => ls.id === this.leadEnums.model.leadStatusId
    );
    if (index < currentIndex) {
      return true;
    }

    return false;
  }

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }
}

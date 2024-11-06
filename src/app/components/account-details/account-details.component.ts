import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { AccountEnumsModel } from '../../models/account.enums.model';
import { AccountModel } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IndustryService } from '../../services/industry.service';
import { AccountTypeService } from '../../services/account-type.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css',
})
export class AccountDetailsComponent implements OnInit {
  accountId: string = '';
  accountEnums: AccountEnumsModel = new AccountEnumsModel();
  updateModel: AccountModel = new AccountModel();
  isReadonly: boolean = true;

  constructor(
    private accountService: AccountService,
    private swal: SwalService,
    private auth: AuthService,
    private activated: ActivatedRoute,
    private industryService: IndustryService,
    private accountTypeService: AccountTypeService,
    private router: Router
  ) {
    this.activated.params.subscribe((res) => {
      this.accountId = res['id'];
      this.accountService.getById(this.accountId, (res) => {
        this.accountEnums.model = res;
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

  update() {
    this.updateModel.modifiedById = this.auth.user.id;
    this.updateModel.modifiedDate = new Date().toString();

    this.accountService.update(this.updateModel, (res, message) => {
      this.accountEnums.model = res;
      this.updateModel = { ...res };
      if (message) {
        this.swal.callToast(message, 'info');
      }
    });
  }

  delete() {
    this.swal.callSwal(
      'Hesabı Sil?',
      `${this.updateModel.name} hesabı silmek istiyor musunuz?`,
      () => {
        this.accountService.deleteById(this.updateModel.id, (res, message) => {
          if (message) {
            this.swal.callToast(message, 'info');
          }

          this.router.navigateByUrl('/accounts');
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

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }
}

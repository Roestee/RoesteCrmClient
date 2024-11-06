import { Component, Inject } from '@angular/core';
import { MaterialsModule } from '../../../modules/materials/materials.module';
import { SharedModule } from '../../../modules/shared.module';
import { AccountEnumsModel } from '../../../models/account.enums.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-create-account',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './dialog-create-account.component.html',
  styleUrl: './dialog-create-account.component.css',
})
export class DialogCreateAccountComponent {
  accountEnums: AccountEnumsModel;

  constructor(
    private dialogRef: MatDialogRef<DialogCreateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountEnumsModel
  ) {
    this.accountEnums = data;
  }

  create(form: NgForm) {
    if (form.valid) {
      const accountTypeIndex = this.accountEnums.accountTypes.findIndex(
        (a) => a.id === this.data.model.accountTypeId
      );
      this.data.model.accountType =
        this.accountEnums.accountTypes[accountTypeIndex];

      this.dialogRef.close(this.data.model);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

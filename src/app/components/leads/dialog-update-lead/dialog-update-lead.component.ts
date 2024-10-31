import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { MaterialsModule } from '../../../modules/materials/materials.module';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeadEnumsModel } from '../../../models/lead.enums.model';

@Component({
  selector: 'app-dialog-update-lead',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './dialog-update-lead.component.html',
  styleUrl: './dialog-update-lead.component.css',
})
export class DialogUpdateLeadComponent {
  leadEnums: LeadEnumsModel;

  constructor(
    private dialogRef: MatDialogRef<DialogUpdateLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LeadEnumsModel
  ) {
    this.leadEnums = data;
  }

  update(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.data.model);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

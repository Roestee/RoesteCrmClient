import { Component, Inject } from '@angular/core';
import { MaterialsModule } from '../../../modules/materials/materials.module';
import { SharedModule } from '../../../modules/shared.module';
import { LeadEnumsModel } from '../../../models/lead.enums.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-create-lead',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './dialog-create-lead.component.html',
  styleUrl: './dialog-create-lead.component.css',
})
export class DialogCreateLeadComponent {
  leadEnums: LeadEnumsModel;

  constructor(
    private dialogRef: MatDialogRef<DialogCreateLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LeadEnumsModel
  ) {
    this.leadEnums = data;
  }

  create(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.data.model);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

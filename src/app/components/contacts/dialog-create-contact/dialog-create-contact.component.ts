import { Component, Inject } from '@angular/core';
import { MaterialsModule } from '../../../modules/materials/materials.module';
import { SharedModule } from '../../../modules/shared.module';
import { ContactEnumsModel } from '../../../models/contact.enums.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-create-contact',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './dialog-create-contact.component.html',
  styleUrl: './dialog-create-contact.component.css',
})
export class DialogCreateContactComponent {
  contactEnums: ContactEnumsModel;

  constructor(
    private dialogRef: MatDialogRef<DialogCreateContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactEnumsModel
  ) {
    this.contactEnums = data;
  }

  create(form: NgForm) {
    if (form.valid) {
      const leadSourceIndex = this.contactEnums.leadSources.findIndex(
        (l) => l.id === this.data.model.leadSourceId
      );
      this.data.model.leadSource =
        this.contactEnums.leadSources[leadSourceIndex];

      const salutationIndex = this.contactEnums.salutations.findIndex(
        (s) => s.id === this.data.model.salutationId
      );
      this.data.model.salutation =
        this.contactEnums.salutations[salutationIndex];

      this.dialogRef.close(this.data.model);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

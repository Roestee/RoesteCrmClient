import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleModel } from '../../../models/role.model';
import { MaterialsModule } from '../../../modules/materials/materials.module';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-dialog-update-role',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './dialog-update-role.component.html',
  styleUrl: './dialog-update-role.component.css',
})
export class DialogUpdateRoleComponent {
  role: RoleModel = new RoleModel();

  constructor(
    private dialogRef: MatDialogRef<DialogUpdateRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleModel
  ) {
    this.role = data;
  }

  update(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.role);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

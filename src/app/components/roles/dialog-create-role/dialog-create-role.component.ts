import { Component } from '@angular/core';
import { MaterialsModule } from '../../../modules/materials/materials.module';
import { SharedModule } from '../../../modules/shared.module';
import { RoleModel } from '../../../models/role.model';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-create-role',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './dialog-create-role.component.html',
  styleUrl: './dialog-create-role.component.css',
})
export class DialogCreateRoleComponent {
  role: RoleModel = new RoleModel();

  constructor(private dialogRef: MatDialogRef<DialogCreateRoleComponent>) {}

  create(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.role);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleModel } from '../../../models/role.model';
import { UserResponseModel } from '../../../models/user.response.model';
import { HttpService } from '../../../services/http.service';
import { SharedModule } from '../../../modules/shared.module';
import { MaterialsModule } from '../../../modules/materials/materials.module';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-dialog-update-user',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './dialog-update-user.component.html',
  styleUrl: './dialog-update-user.component.css',
})
export class DialogUpdateUserComponent implements OnInit {
  roles: RoleModel[] = [];
  user: UserResponseModel;

  constructor(
    private roleService: RoleService,
    private dialogRef: MatDialogRef<DialogUpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserResponseModel
  ) {
    this.user = data;
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleService.getAll((res) => {
      this.roles = res.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  update(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.user);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { MaterialsModule } from '../../../modules/materials/materials.module';
import { UserResponseModel } from '../../../models/user.response.model';
import { SharedModule } from '../../../modules/shared.module';
import { RoleModel } from '../../../models/role.model';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-dialog-create-user',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './dialog-create-user.component.html',
  styleUrl: './dialog-create-user.component.css',
})
export class DialogCreateUserComponent implements OnInit {
  user: UserResponseModel = new UserResponseModel();
  roles: RoleModel[] = [];

  constructor(
    private roleService: RoleService,
    private dialogRef: MatDialogRef<DialogCreateUserComponent>
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleService.getAll((res) => {
      this.roles = res.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.user);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hidePassword = signal(true);
  clickEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }
}

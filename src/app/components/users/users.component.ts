import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { SwalService } from '../../services/swal.service';
import { UserResponseModel } from '../../models/user.response.model';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateUserComponent } from './dialog-create-user/dialog-create-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { DialogUpdateUserComponent } from './dialog-update-user/dialog-update-user.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule, MaterialsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: UserResponseModel[] = [];

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'userName',
    'email',
    'phoneNumber',
    'role',
    'update',
  ];

  dataSource = new MatTableDataSource<UserResponseModel>();

  createModel: UserResponseModel = new UserResponseModel();
  updateModel: UserResponseModel = new UserResponseModel();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  readonly dialog = inject(MatDialog);

  constructor(private swal: SwalService, private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAll((res) => {
      this.users = [...res];
      this.dataSource = new MatTableDataSource(this.users);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  create() {
    this.userService.create(this.createModel, (res, message) => {
      this.users.push(res);
      this.dataSource.data = this.users;
      if (message) {
        this.swal.callToast(message);
      }
    });
  }

  update() {
    this.userService.update(this.updateModel, (res, message) => {
      const index = this.users.findIndex((u) => u.id === res.id);
      if (index !== -1) {
        this.users[index] = res;
        this.dataSource.data = this.users;
      }
      if (message) {
        this.swal.callToast(message, 'info');
      }
    });
  }

  deleteById(model: UserResponseModel) {
    this.swal.callSwal(
      'Kullanıcıyı Sil?',
      `${model.firstName} ${model.lastName} kullanıcısını silmek istiyor musunuz?`,
      () =>
        this.userService.deleteById(model, (res, message) => {
          this.users = this.users.filter((u) => u.id !== res.id);
          this.dataSource.data = this.users;

          if (message) {
            this.swal.callToast(message, 'info');
          }
        })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(DialogCreateUserComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createModel = { ...this.createModel, ...result };
        this.create();
      }
    });
  }

  openUpdateUserDialog(model: UserResponseModel) {
    const dialogRef = this.dialog.open(DialogUpdateUserComponent, {
      width: '1000px',
      data: { ...model },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateModel = { ...this.updateModel, ...result };
        this.update();
      }
    });
  }
}

import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { RoleModel } from '../../models/role.model';
import { SwalService } from '../../services/swal.service';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogCreateRoleComponent } from './dialog-create-role/dialog-create-role.component';
import { RoleService } from '../../services/role.service';
import { DialogUpdateRoleComponent } from './dialog-update-role/dialog-update-role.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [MaterialsModule, SharedModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  roles: RoleModel[] = [];

  dataSource = new MatTableDataSource<RoleModel>();

  createModel: RoleModel = new RoleModel();
  updateModel: RoleModel = new RoleModel();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'name', 'update'];

  constructor(private swal: SwalService, private roleService: RoleService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.roleService.getAll((res) => {
      this.roles = [...res].sort((a, b) => a.name.localeCompare(b.name));
      this.dataSource = new MatTableDataSource(this.roles);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  get(model: RoleModel) {
    this.updateModel = { ...model };
  }

  create() {
    this.roleService.create(this.createModel, (res, message) => {
      this.roles.push(res);
      this.dataSource.data = this.roles;
      if (message) {
        this.swal.callToast(message);
      }
    });
  }

  update() {
    this.roleService.update(this.updateModel, (res, message) => {
      const index = this.roles.findIndex((r) => r.id === res.id);
      if (index !== -1) {
        this.roles[index] = res;
        this.dataSource.data = this.roles;
      }

      if (message) {
        this.swal.callToast(message, 'info');
      }
    });
  }

  deleteById(model: RoleModel) {
    this.swal.callSwal(
      'Rolü Sil?',
      `${model.name} rolü silmek istiyor musunuz?`,
      () => {
        this.roleService.deleteById(model, (res, message) => {
          this.roles = this.roles.filter((r) => r.id !== res.id);
          this.dataSource.data = this.roles;

          if (message) {
            this.swal.callToast(message, 'info');
          }
        });
      }
    );
  }

  openCreateRoleDialog() {
    const dialogRef = this.dialog.open(DialogCreateRoleComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createModel = { ...this.createModel, ...result };
        this.create();
      }
    });
  }

  openUpdateRoleDialog(model: RoleModel) {
    const dialogRef = this.dialog.open(DialogUpdateRoleComponent, {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

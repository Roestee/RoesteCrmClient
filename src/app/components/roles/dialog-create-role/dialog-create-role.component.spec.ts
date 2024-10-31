import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateRoleComponent } from './dialog-create-role.component';

describe('DialogCreateRoleComponent', () => {
  let component: DialogCreateRoleComponent;
  let fixture: ComponentFixture<DialogCreateRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

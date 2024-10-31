import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateLeadComponent } from './dialog-update-lead.component';

describe('DialogUpdateLeadComponent', () => {
  let component: DialogUpdateLeadComponent;
  let fixture: ComponentFixture<DialogUpdateLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUpdateLeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

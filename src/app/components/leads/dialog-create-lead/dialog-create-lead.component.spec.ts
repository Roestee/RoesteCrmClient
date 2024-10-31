import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateLeadComponent } from './dialog-create-lead.component';

describe('DialogCreateLeadComponent', () => {
  let component: DialogCreateLeadComponent;
  let fixture: ComponentFixture<DialogCreateLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateLeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

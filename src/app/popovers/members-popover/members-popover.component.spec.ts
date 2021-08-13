import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersPopoverComponent } from './members-popover.component';

describe('MembersPopoverComponent', () => {
  let component: MembersPopoverComponent;
  let fixture: ComponentFixture<MembersPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

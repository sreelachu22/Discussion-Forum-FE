import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminCategoryManagementComponent } from './superadmin-category-management.component';

describe('SuperadminCategoryManagementComponent', () => {
  let component: SuperadminCategoryManagementComponent;
  let fixture: ComponentFixture<SuperadminCategoryManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperadminCategoryManagementComponent]
    });
    fixture = TestBed.createComponent(SuperadminCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

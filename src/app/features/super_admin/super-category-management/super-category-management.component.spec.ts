import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperCategoryManagementComponent } from './super-category-management.component';

describe('SuperCategoryManagementComponent', () => {
  let component: SuperCategoryManagementComponent;
  let fixture: ComponentFixture<SuperCategoryManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperCategoryManagementComponent]
    });
    fixture = TestBed.createComponent(SuperCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

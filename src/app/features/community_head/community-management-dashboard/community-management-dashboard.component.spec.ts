import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityManagementDashboardComponent } from './community-management-dashboard.component';

describe('CommunityManagementDashboardComponent', () => {
  let component: CommunityManagementDashboardComponent;
  let fixture: ComponentFixture<CommunityManagementDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityManagementDashboardComponent],
    });
    fixture = TestBed.createComponent(CommunityManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

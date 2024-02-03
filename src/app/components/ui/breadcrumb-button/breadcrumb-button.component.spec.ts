import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbButtonComponent } from './breadcrumb-button.component';

describe('BreadcrumbButtonComponent', () => {
  let component: BreadcrumbButtonComponent;
  let fixture: ComponentFixture<BreadcrumbButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbButtonComponent]
    });
    fixture = TestBed.createComponent(BreadcrumbButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavCustomComponent } from './sidenav-custom.component';

describe('SidenavCustomComponent', () => {
  let component: SidenavCustomComponent;
  let fixture: ComponentFixture<SidenavCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavCustomComponent],
    });
    fixture = TestBed.createComponent(SidenavCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

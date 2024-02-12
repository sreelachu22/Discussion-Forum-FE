import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotficationListComponent } from './notfication-list.component';

describe('NotficationListComponent', () => {
  let component: NotficationListComponent;
  let fixture: ComponentFixture<NotficationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotficationListComponent]
    });
    fixture = TestBed.createComponent(NotficationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

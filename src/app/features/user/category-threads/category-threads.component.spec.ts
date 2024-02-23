import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryThreadsComponent } from './category-threads.component';

describe('CategoryThreadsComponent', () => {
  let component: CategoryThreadsComponent;
  let fixture: ComponentFixture<CategoryThreadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryThreadsComponent],
    });
    fixture = TestBed.createComponent(CategoryThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

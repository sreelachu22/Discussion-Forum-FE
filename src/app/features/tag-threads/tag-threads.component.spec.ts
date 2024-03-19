import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagThreadsComponent } from './tag-threads.component';

describe('TagThreadsComponent', () => {
  let component: TagThreadsComponent;
  let fixture: ComponentFixture<TagThreadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagThreadsComponent]
    });
    fixture = TestBed.createComponent(TagThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

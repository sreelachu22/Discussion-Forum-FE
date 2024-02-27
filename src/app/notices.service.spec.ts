import { TestBed } from '@angular/core/testing';
import { NoticesService } from './service/HttpServices/notices.service';

describe('NoticesService', () => {
  let service: NoticesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

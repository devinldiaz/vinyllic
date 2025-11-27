import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getVinyls()', () => {
    it('should call the correct API endpoint', () => {
      const httpSpy = spyOn(service['http'], 'get').and.callThrough();
      service.getVinyls();
      expect(httpSpy).toHaveBeenCalledWith('http://localhost:8080/vinyls');
    });
  });
});

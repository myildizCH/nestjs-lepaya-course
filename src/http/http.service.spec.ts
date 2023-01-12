import { Test, TestingModule } from '@nestjs/testing';
import { CustomHttpService } from './http.service';
import { HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { BaseUrl } from './../courses/enum';

describe('CustomHttpService', () => {
  let service: CustomHttpService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomHttpService,
        {
          provide: HttpService,
          useFactory: () => new HttpService(),
        },
      ],
    }).compile();

    service = module.get(CustomHttpService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetch', () => {
    it('should return the data from the GET request', async () => {
      const path = 'courses';
      const id = '123';
      const data = { id: '123', name: 'Test Course' };
      const mockResponse = {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
      const result = await service.fetch(path, id);
      expect(httpService.get).toHaveBeenCalledWith(
        `${BaseUrl.HR_SYSTEM}${path}/${id}`,
      );
      expect(result).toEqual(data);
    });

    it('should throw a NotFoundException if the GET request returns a 404 status code', async () => {
      const path = 'courses';
      const id = 'invalidId';
      const mockResponse = {
        data: null,
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {},
      };
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

      try {
        await service.fetch(path, id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Resource with ID ${id} not found`);
      }
    });
  });
});

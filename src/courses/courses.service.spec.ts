import { Test, TestingModule } from '@nestjs/testing';
import { HRCourseInputDTO } from './dto/hr-course-input.dto';
import { HRTrainerInputDTO } from './dto/hr-trainer-input.dto';
import { HRLearnerInputDTO } from './dto/hr-learner-input.dto';
import { CustomHttpService } from './../http/http.service';
import { CoursesService } from './courses.service';
import { HttpModule } from '@nestjs/axios';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpService: CustomHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursesService, CustomHttpService],
      imports: [HttpModule],
    }).compile();

    service = module.get(CoursesService);
    httpService = module.get(CustomHttpService);
  });

  describe('getCourseById', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return a LepayaCourseOutputDTO object', async () => {
      const courseId = '123';
      const course: HRCourseInputDTO = {
        id: courseId,
        title: 'Test Course',
        date: '2073-01-18T06:57:06.870Z',
        trainerId: '456',
        learners: ['789'],
      };
      const trainer: HRTrainerInputDTO = { id: '456', name: 'Test Trainer' };
      const learners: HRLearnerInputDTO = {
        learners: [{ id: '789', name: 'Test Learner' }],
      };
      const spy = jest
        .spyOn(httpService, 'fetch')
        .mockResolvedValueOnce(course)
        .mockResolvedValueOnce(trainer)
        .mockResolvedValueOnce(learners);

      const result = await service.getCourseById(courseId);

      expect(spy).toHaveBeenCalledWith('courses', courseId);
      expect(spy).toHaveBeenCalledWith('trainers', '456');
      expect(spy).toHaveBeenCalledWith('learners');
      expect(result).toEqual({
        id: courseId,
        title: 'Test Course',
        date: '2073-01-18T06:57:06.870Z',
        trainer: { id: '456', name: 'Test Trainer' },
        learners: [{ id: '789', name: 'Test Learner' }],
      });
    });
  });
});

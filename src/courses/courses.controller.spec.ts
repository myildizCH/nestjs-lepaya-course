import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomHttpService } from './../http/http.service';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { LepayaCourseOutputDTO } from './dto/lepaya-course-output.dto';

describe('CoursesController', () => {
  let controller: CoursesController;
  let coursesService: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [CoursesService, CustomHttpService],
      imports: [HttpModule],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    coursesService = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCourseById', () => {
    it('should return a LepayaCourseOutputDTO object', async () => {
      const courseId = '123';
      const course: LepayaCourseOutputDTO = {
        id: courseId,
        title: 'Test Course',
        date: '2073-01-18T06:57:06.870Z',
        trainer: { id: '456', name: 'Test Trainer' },
        learners: [{ id: '789', name: 'Test Learner' }],
      };

      jest.spyOn(coursesService, 'getCourseById').mockResolvedValue(course);

      const result = await controller.getCourseById(courseId);

      expect(coursesService.getCourseById).toHaveBeenCalledWith(courseId);
      expect(result).toEqual(course);
    });

    it('should return a course by id', async () => {
      const mockId = '123';
      const mockCourse: LepayaCourseOutputDTO = {
        id: mockId,
        title: 'Test Course',
        date: '2073-01-18T06:57:06.870Z',
        trainer: { id: '456', name: 'Test Trainer' },
        learners: [{ id: '789', name: 'Test Learner' }],
      };
      jest
        .spyOn(coursesService, 'getCourseById')
        .mockImplementation(() => Promise.resolve(mockCourse));

      expect(await controller.getCourseById(mockId)).toEqual(mockCourse);
    });
  });
});

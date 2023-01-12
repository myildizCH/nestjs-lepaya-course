import { HRCourseInputDTO } from './hr-course-input.dto';
import { HRLearner } from './hr-learner-input.dto';
import { HRTrainerInputDTO } from './hr-trainer-input.dto';

export class LepayaCourseOutputDTO {
  static buildResponse(
    courseInputDto: HRCourseInputDTO,
    trainerInputDto: HRTrainerInputDTO,
    learners: Array<HRLearner>,
  ) {
    return {
      id: courseInputDto.id,
      title: courseInputDto.title,
      date: courseInputDto.date,
      trainer: trainerInputDto,
      learners: learners,
    };
  }

  id: string;
  title: string;
  date: string;
  trainer: HRTrainerInputDTO;
  learners: Array<HRLearner>;
}

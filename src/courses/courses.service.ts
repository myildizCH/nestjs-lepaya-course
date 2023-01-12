import { Injectable } from '@nestjs/common';
import { CustomHttpService } from 'src/http/http.service';
import { HRCourseInputDTO } from './dto/hr-course-input.dto';
import { HRLearner, HRLearnerInputDTO } from './dto/hr-learner-input.dto';
import { HRTrainerInputDTO } from './dto/hr-trainer-input.dto';
import { LepayaCourseOutputDTO } from './dto/lepaya-course-output.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly httpService: CustomHttpService) {}

  async getCourseById(id: string): Promise<LepayaCourseOutputDTO> {
    // Fetch course by id
    const course: HRCourseInputDTO = await this.httpService.fetch(
      'courses',
      id,
    );

    // Fetch trainer by id
    const trainer: HRTrainerInputDTO = await this.httpService.fetch(
      'trainers',
      course.trainerId,
    );

    // get all learners
    const { learners }: HRLearnerInputDTO = await this.httpService.fetch(
      'learners',
    );

    // filter the learners by id
    const filteredLearnersList: Array<HRLearner> = learners.filter((learner) =>
      course.learners.includes(learner.id),
    );

    return LepayaCourseOutputDTO.buildResponse(
      course,
      trainer,
      filteredLearnersList,
    );
  }
}

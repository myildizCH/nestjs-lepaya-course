import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { LepayaCourseOutputDTO } from './dto/lepaya-course-output.dto';

@Controller('api/lepaya-courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('/:id')
  async getCourseById(@Param('id') id: string): Promise<LepayaCourseOutputDTO> {
    return this.coursesService.getCourseById(id);
  }
}

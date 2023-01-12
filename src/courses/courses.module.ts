import { Module } from '@nestjs/common';
import { CustomHttpModule } from './../http/http.module';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [CustomHttpModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}

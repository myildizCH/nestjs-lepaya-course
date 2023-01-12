import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomHttpService } from './http.service';

@Module({
  providers: [CustomHttpService],
  exports: [CustomHttpService],
  imports: [HttpModule],
})
export class CustomHttpModule {}

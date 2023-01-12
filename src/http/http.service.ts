import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class CustomHttpService {
  private readonly logger = new Logger(CustomHttpService.name);
  constructor(private readonly httpService: HttpService) {}

  private async get<Response>(url: string): Promise<Response> {
    return firstValueFrom<Response>(
      this.httpService
        .get(url)
        .pipe(map((response: AxiosResponse) => response.data)),
    );
  }

  public async fetch<T>(path: string, id?: string): Promise<T | undefined> {
    const ID = id ? '/' + id : '';
    this.logger.debug(`fetch() for ${path}`);

    try {
      return await this.get<T>(
        `https://kbfszrxx5vacidgrgdhqzu25r40vyyuw.lambda-url.eu-central-1.on.aws/api/${path}${ID}`,
      );
    } catch (error) {
      this.logger.error(error.response.data);
      if (error?.response?.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(`Resource with ID ${id} not found`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

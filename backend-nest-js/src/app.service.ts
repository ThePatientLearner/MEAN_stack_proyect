import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the series api! to get info from the api visit -> localhost:3000/api/series ';
  }
}

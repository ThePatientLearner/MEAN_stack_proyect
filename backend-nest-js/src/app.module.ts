import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { ConfigModule } from '@nestjs/config'; // posible fallo
import { SeriesModule } from './series/series.module';
import 'dotenv/config';

@Module({
  imports: [
      MongooseModule.forRoot(process.env.DBURL),
      ConfigModule.forRoot(),
      SeriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './serie.service';
import {MongooseModule} from "@nestjs/mongoose";
import {SerieSchema} from "./schemas/serie.schema/serie.schema";


@Module({
  imports: [
      MongooseModule.forFeature(
          [{
              name: 'Serie',
              schema: SerieSchema,
              collection: 'Series'}])
  ],
  controllers: [SeriesController],
  providers: [SeriesService]
})
export class SeriesModule {}

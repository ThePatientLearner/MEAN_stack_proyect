import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param, Patch,
    Post, Put,Query
} from '@nestjs/common';
import {SeriesService} from "./serie.service";
import {SerieDto} from "./dto/serie.dto/serie.dto";


@Controller('api/series')
export class SeriesController {
    constructor(private readonly seriesService:SeriesService) {}

    @Post('')
    async addSerie(@Body() serieDto:SerieDto){
        try{
            const data = await this.seriesService.addSerie(serieDto);
            return {
                status: true,
                message: 'Serie Created'
            }
        }catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException({
                status: false,
                message: e.message,
            });
        }
    }

    @Get('')
    async getSeries() {
        try {
            const data = await this.seriesService.getSeries();
            return {
                status: true,
                data,
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException({
                status: false,
                message: e.message,
            });
        }
    }

    @Get('/serie/:id')
    async getSerie(@Param('id') id: string) {
        try {
            const data = await this.seriesService.getSerie(id);
            if (!data) {
                throw new NotFoundException({
                    status: false,
                    message: 'Serie not found',
                });
            }
            return {
                status: true,
                data,
            };
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException({
                status: false,
                message: e.message,
            });
        }
    }

    @Put('/:id')
    async updateMovie(@Param('id') id: string, @Body() serieDto: SerieDto) {
        try {
            const updatedSerie = await this.seriesService.updateSerie(id, serieDto);
            if (!updatedSerie) {
                throw new NotFoundException({
                    status: false,
                    message: 'Serie not found',
                });
            }
            return {
                status: true,
                message: 'Serie updated',
            };
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException({
                status: false,
                message: e.message,
            });
        }
    }

    @Delete('/delete/:id')
    async deleteMovie(@Param('id') id: string) {
        try {
            const deletedMovie = await this.seriesService.deleteSerie(id);
            if (!deletedMovie) {
                throw new NotFoundException({
                    status: false,
                    message: 'Serie Not Found',
                });
            }
            return {
                status: true,
                message: 'Serie Deleted!',
            };
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException({
                status: false,
                message: e.message,
            });
        }
    }

    @Get('categorias')
    async getGenres() {
        try {
            const data = await this.seriesService.getCategorias();
            return {
                status: true,
                data,
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException({
                status: false,
                message: e.message,
            });
        }
    }

    @Patch('/:id')
    async updatePatchMovie(@Param('id') id: string, @Body() movieDto: SerieDto) {
        try {
            const updatedSerie = await this.seriesService.updateSerie(id, movieDto);
            if (!updatedSerie) {
                throw new NotFoundException({
                    status: false,
                    message: 'Serie not found',
                });
            }
            return {
                status: true,
                message: 'Serie updated',
            };
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException({
                status: false,
                message: e.message,
            });
        }
    }

    @Get('/searchCategoria')
    async findByCategory(@Query('categoria') categoria: string) {
        return await this.seriesService.findByCategory(categoria);
    }

    @Get('/search')
    async findByTitle(@Query('titulo') titulo: string) {
        return await this.seriesService.findByTitle(titulo);
    }


}

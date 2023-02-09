import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Candidate } from './entities/candidate.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { ApiOkPaginatedResponse } from '../../decorators/api-ok-paginated-response.decorator';

// TODO: Implement search
@ApiTags('Candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createCandidateDto: CreateCandidateDto,
    @UploadedFile() resume: Express.Multer.File,
  ): Promise<Candidate> {
    return this.candidatesService.create(createCandidateDto, resume);
  }

  @Get()
  @ApiOkPaginatedResponse(Candidate)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Candidate>> {
    return this.candidatesService.findAll({
      page,
      limit,
      route: '/candidates',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Candidate> {
    return this.candidatesService.findOne(+id);
  }
}

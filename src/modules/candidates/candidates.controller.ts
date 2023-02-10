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
  UseGuards,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Candidate } from './entities/candidate.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../helpers/file.helper';
import { ApiOkPaginatedResponse } from '../../decorators/api-ok-paginated-response.decorator';
import { SearchCandidateDto } from './dto/search-candidate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Candidates')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Missing or invalid token',
})
@UseGuards(JwtAuthGuard)
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

  @ApiOkPaginatedResponse(Candidate)
  @Get('search')
  search(
    @Query() searchOptions: SearchCandidateDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.candidatesService.search(searchOptions, {
      page,
      limit,
      route: '/candidates/search',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Candidate> {
    return this.candidatesService.findOne(+id);
  }
}

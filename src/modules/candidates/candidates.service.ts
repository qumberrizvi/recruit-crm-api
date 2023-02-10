import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SearchCandidateDto } from './dto/search-candidate.dto';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly repository: Repository<Candidate>,
  ) {}

  async create(
    createCandidateDto: CreateCandidateDto,
    resume?: Express.Multer.File,
  ): Promise<Candidate> {
    const candidate = new Candidate();
    Object.assign(candidate, createCandidateDto);
    candidate.dob = createCandidateDto.dob?.getTime();
    if (resume) {
      candidate.resume = resume?.path;
    }
    return this.repository.create(candidate).save();
  }

  findAll(options: IPaginationOptions): Promise<Pagination<Candidate>> {
    return paginate<Candidate>(this.repository, options);
  }

  findOne(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  search(searchOptions: SearchCandidateDto, options: IPaginationOptions) {
    return paginate(this.repository, options, {
      where: {
        firstName: searchOptions.firstName
          ? Like(`%${searchOptions.firstName}%`)
          : null,
        lastName: searchOptions.lastName
          ? Like(`%${searchOptions.lastName}%`)
          : null,
        email: searchOptions.email ? Like(`%${searchOptions.email}%`) : null,
      },
    });
  }
}

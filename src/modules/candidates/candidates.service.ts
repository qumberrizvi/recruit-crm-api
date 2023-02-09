import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    candidate.dob = createCandidateDto.dob?.getMilliseconds();
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
}

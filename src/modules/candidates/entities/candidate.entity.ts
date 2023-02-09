import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('candidates')
export class Candidate extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'first_name' })
  @ApiProperty()
  firstName: string;

  @Column({ name: 'last_name' })
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  contact: string;

  @Column()
  @ApiProperty()
  gender: number;

  @Column()
  @ApiProperty()
  qualification: string;

  @Column()
  @ApiProperty()
  dob: number;

  @Column()
  @ApiProperty()
  address: string;

  @Column()
  @ApiProperty()
  resume: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
}

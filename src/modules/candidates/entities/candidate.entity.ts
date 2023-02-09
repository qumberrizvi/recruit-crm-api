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
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ name: 'first_name' })
  @ApiProperty({ example: 'John' })
  firstName: string;

  @Column({ name: 'last_name' })
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @Column()
  @ApiProperty({ example: 'john@mail.com' })
  email: string;

  @Column()
  @ApiProperty({ example: '+919876543210' })
  contact: string;

  @Column()
  @ApiProperty({ example: 1 })
  gender: number;

  @Column()
  @ApiProperty({ example: 'MD' })
  qualification: string;

  @Column()
  @ApiProperty({ example: 662601600000 })
  dob: number;

  @Column()
  @ApiProperty({ example: 'Mall Avenue, Lucknow, India' })
  address: string;

  @Column()
  @ApiProperty({ example: 'uploads/resume.pdf' })
  resume: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ example: '2023-02-09T12:35:01.919Z' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ example: '2023-02-09T12:35:01.919Z' })
  updatedAt: Date;
}

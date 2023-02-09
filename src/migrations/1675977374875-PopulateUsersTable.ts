import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { bcryptConstant } from '../modules/auth/constants/bcrypt.constant';

export class PopulateUsersTable1675977374875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userData = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@mail.com',
        password: 'john@123',
      },
      {
        firstName: 'Qumber',
        lastName: 'Rizvi',
        email: 'qumber@mail.com',
        password: 'qumber@123',
      },
    ];

    const users = [];
    for (const userDatum of userData) {
      const user = new User();
      Object.assign(user, userDatum);
      user.password = await bcrypt.hash(
        userDatum.password,
        bcryptConstant.saltOrRounds,
      );
      users.push(user);
    }
    await queryRunner.manager.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('users');
  }
}

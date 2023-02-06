import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateCandidatesTable1675706697500 implements MigrationInterface {
  private table = 'candidates';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.table,
        columns: [
          new TableColumn({
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'first_name',
            type: 'varchar',
            isNullable: false,
            length: '40',
          }),
          new TableColumn({
            name: 'last_name',
            type: 'varchar',
            isNullable: true,
            length: '40',
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            isNullable: true,
            length: '100',
          }),
          new TableColumn({
            name: 'contact',
            type: 'varchar',
            isNullable: true,
            length: '100',
          }),
          new TableColumn({
            name: 'gender',
            type: 'tinyint',
            isNullable: true,
          }),
          new TableColumn({
            name: 'qualification',
            type: 'varchar',
            isNullable: true,
            length: '200',
          }),
          new TableColumn({
            name: 'dob',
            type: 'bigint',
            unsigned: true,
            isNullable: true,
          }),
          new TableColumn({
            name: 'address',
            type: 'varchar',
            isNullable: true,
            length: '500',
          }),
          new TableColumn({
            name: 'resume',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'current_timestamp',
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true);
  }
}

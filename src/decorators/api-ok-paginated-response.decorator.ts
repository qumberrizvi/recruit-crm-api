import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  IPaginationLinks,
  IPaginationMeta,
  Pagination,
} from 'nestjs-typeorm-paginate';

class Meta implements IPaginationMeta {
  @ApiProperty({ example: 1 })
  totalItems: number;
  @ApiProperty({ example: 1 })
  itemCount: number;
  @ApiProperty({ example: 10 })
  itemsPerPage: number;
  @ApiProperty({ example: 1 })
  totalPages: number;
  @ApiProperty({ example: 1 })
  currentPage: number;
}

class Links implements IPaginationLinks {
  @ApiProperty({ example: '/candidates?limit=10' })
  first: string;
  @ApiProperty({ example: '' })
  previous: string;
  @ApiProperty({ example: '' })
  next: string;
  @ApiProperty({ example: '/candidates?page=1&limit=10' })
  last: string;
}

class PaginationResponse extends Pagination<unknown> {
  @ApiProperty()
  meta: Meta;
  @ApiProperty()
  links: Links;
}

export const ApiOkPaginatedResponse = <PaginatedEntity extends Type<unknown>>(
  entity: PaginatedEntity,
) =>
  applyDecorators(
    ApiExtraModels(PaginationResponse, entity),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(entity) },
              },
            },
          },
          { $ref: getSchemaPath(PaginationResponse) },
        ],
      },
    }),
  );

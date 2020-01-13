import {DefaultCrudRepository} from '@loopback/repository';
import {Albums, AlbumsRelations} from '../models';
import {TododatasoureDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AlbumsRepository extends DefaultCrudRepository<
  Albums,
  typeof Albums.prototype.id,
  AlbumsRelations
> {
  constructor(
    @inject('datasources.tododatasoure') dataSource: TododatasoureDataSource,
  ) {
    super(Albums, dataSource);
  }
}

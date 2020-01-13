import {DefaultCrudRepository} from '@loopback/repository';
import {TodosModel, TodosModelRelations} from '../models';
import {TododatasoureDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TodosModelRepository extends DefaultCrudRepository<
  TodosModel,
  typeof TodosModel.prototype.id,
  TodosModelRelations
> {
  constructor(
    @inject('datasources.tododatasoure') dataSource: TododatasoureDataSource,
  ) {
    super(TodosModel, dataSource);
  }
}

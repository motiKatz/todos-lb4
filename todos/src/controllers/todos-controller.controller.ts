import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TodosModel} from '../models';
import {TodosModelRepository} from '../repositories';

export class TodosControllerController {
  constructor(
    @repository(TodosModelRepository)
    public todosModelRepository : TodosModelRepository,
  ) {}

  @post('/todos-models', {
    responses: {
      '200': {
        description: 'TodosModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(TodosModel)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodosModel, {
            title: 'NewTodosModel',
            exclude: ['id'],
          }),
        },
      },
    })
    todosModel: Omit<TodosModel, 'id'>,
  ): Promise<TodosModel> {
    return this.todosModelRepository.create(todosModel);
  }

  @get('/todos-models/count', {
    responses: {
      '200': {
        description: 'TodosModel model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TodosModel)) where?: Where<TodosModel>,
  ): Promise<Count> {
    return this.todosModelRepository.count(where);
  }

  @get('/todos-models', {
    responses: {
      '200': {
        description: 'Array of TodosModel model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TodosModel, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TodosModel)) filter?: Filter<TodosModel>,
  ): Promise<TodosModel[]> {
    return this.todosModelRepository.find(filter);
  }

  @patch('/todos-models', {
    responses: {
      '200': {
        description: 'TodosModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodosModel, {partial: true}),
        },
      },
    })
    todosModel: TodosModel,
    @param.query.object('where', getWhereSchemaFor(TodosModel)) where?: Where<TodosModel>,
  ): Promise<Count> {
    return this.todosModelRepository.updateAll(todosModel, where);
  }

  @get('/todos-models/{id}', {
    responses: {
      '200': {
        description: 'TodosModel model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TodosModel, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(TodosModel)) filter?: Filter<TodosModel>
  ): Promise<TodosModel> {
    return this.todosModelRepository.findById(id, filter);
  }

  @patch('/todos-models/{id}', {
    responses: {
      '204': {
        description: 'TodosModel PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodosModel, {partial: true}),
        },
      },
    })
    todosModel: TodosModel,
  ): Promise<void> {
    await this.todosModelRepository.updateById(id, todosModel);
  }

  @put('/todos-models/{id}', {
    responses: {
      '204': {
        description: 'TodosModel PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todosModel: TodosModel,
  ): Promise<void> {
    await this.todosModelRepository.replaceById(id, todosModel);
  }

  @del('/todos-models/{id}', {
    responses: {
      '204': {
        description: 'TodosModel DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todosModelRepository.deleteById(id);
  }
}

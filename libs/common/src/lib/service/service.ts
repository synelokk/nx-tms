import { AbstractService } from './service.abstract';
import { Model } from 'sequelize-typescript';
import { Repository } from '../repository';
import { Injectable } from '@nestjs/common';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { IncludeOptions, WhereOptions } from 'sequelize';

/**
 * Generic service class that provides common CRUD operations for entities.
 *
 * @template T - The type of the entity model.
 * @implements {AbstractService<T>}
 */
@Injectable()
export class Service<T extends Model<T>> implements AbstractService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  /**
   * Retrieves all records from the repository. If a mapping DTO is provided,
   * it maps the records to the specified DTO class.
   *
   * @template R - The type of the DTO class to map the records to.
   * @param {ClassConstructor<R>} [mapDto] - The DTO class constructor to map the records to.
   * @returns {Promise<T[] | R[]>} - A promise that resolves to an array of records or mapped DTOs.
   */
  public async findAll<R>(
    mapDto?: ClassConstructor<R>,
    where?: WhereOptions<T>,
    options?: IncludeOptions,
  ): Promise<T[] | R[]> {
    const data = await this.repository.findAll(where, options);
    if (mapDto) {
      return data.map((item) => {
        return plainToInstance(mapDto, item);
      });
    }

    return data;
  }

  /**
   * Finds an entity by its primary key.
   *
   * @param {string} sid - The primary key of the entity to find.
   * @returns {Promise<T>} A promise that resolves to the found entity.
   * @throws Will throw an error if the repository operation fails.
   */
  public async findByPk(sid: string): Promise<T> {
    //await this.logger.debug(`Call service findByPk`);
    return this.repository.findByPk(sid).catch((error) => {
      throw error;
    });
  }

  /**
   * Finds an entity by its ID.
   *
   * @param id - The ID of the entity to find.
   * @returns A promise that resolves to the found entity.
   * @throws Will throw an error if the entity cannot be found.
   */
  public async findById(id: number): Promise<T> {
    //await this.logger.debug(`Call service findById`);
    return this.repository.findById(id).catch((error) => {
      throw error;
    });
  }

  /**
   * Finds an entity by the given condition.
   *
   * @param where - The condition to find the entity.
   * @returns A promise that resolves to the found entity.
   * @throws Will throw an error if the entity cannot be found.
   */
  public async findOne(where: WhereOptions<T>): Promise<T> {
    //await this.logger.debug(`Call service findOne`);
    return this.repository.findOne(where).catch((error) => {
      throw error;
    });
  }

  /**
   * Creates a new entity in the repository.
   *
   * @param data - The data to create the new entity with.
   * @returns A promise that resolves to the created entity.
   * @throws Will throw an error if the creation fails.
   */
  public async create<R>(
    data: any,
    mapDto?: {
      dto?: ClassConstructor<R>;
      options?: ClassTransformOptions;
    },
  ): Promise<T | R> {
    //await this.logger.debug(`Call service create`);
    const entity = await this.repository.create(data);
    if (mapDto && mapDto.dto) {
      if (!mapDto.options)
        mapDto.options = {
          exposeUnsetFields: false,
        };

      const dto = plainToInstance(mapDto.dto, entity, mapDto.options);
      return dto;
    }
    return entity as T;
  }

  /**
   * Updates a record in the repository with the given data.
   *
   * @param {number} id - The unique identifier of the record to update.
   * @param {any} data - The data to update the record with.
   * @returns {Promise<[number]>} A promise that resolves to an array containing the number of affected rows.
   * @throws Will throw an error if the update operation fails.
   */
  public async update(id: number, data: any): Promise<[number]> {
    //await this.logger.debug(`Call service update`);
    return this.repository.update(id, data).catch((error) => {
      throw error;
    });
  }

  /**
   * Deletes an entity by its ID.
   *
   * @param {number} id - The ID of the entity to delete.
   * @returns {Promise<number>} A promise that resolves to the number of affected rows.
   * @throws Will throw an error if the deletion fails.
   */
  public async delete(id: number): Promise<number> {
    //await this.logger.debug(`Call service delete`);
    return this.repository.delete(id).catch((error) => {
      throw error;
    });
  }

  /**
   * Executes a stored procedure with the given name and parameters.
   *
   * @param spName - The name of the stored procedure to execute.
   * @param parameter - The parameters to pass to the stored procedure.
   * @returns A promise that resolves with the result of the stored procedure.
   * @throws Will throw an error if the stored procedure execution fails.
   */
  public async storedProcedure(spName: string, parameter: any): Promise<any> {
    //await this.logger.debug(`Call service storedProcedure`);
    return this.repository.storedProcedure(spName, parameter).catch((error) => {
      throw error;
    });
  }

  /**
   * Finds an entity by a specified condition.
   *
   * @param where - The condition to find the entity.
   * @returns A promise that resolves to the found entity.
   */
  public async findByWhere(
    where?: WhereOptions<T>,
    options?: IncludeOptions,
  ): Promise<T | T[] | null> {
    //await this.logger.debug(`Call service findByWhere`);
    return this.repository.findByWhere(where, options);
  }
  /**
   * Updates entities that meet the specified condition.
   *
   * @param where - The condition to update the entities.
   * @param data - The new data for the entities.
   * @returns A promise that resolves to an array containing the number of affected rows.
   */
  public async updateByWhere(
    where: WhereOptions<T>,
    data: any,
  ): Promise<[number]> {
    //await this.logger.debug(`Call service updateByWhere`);
    return this.repository.updateByWhere(where, data);
  }

  /**
   * Deletes entities that meet the specified condition.
   *
   * @param where - The condition to delete the entities.
   * @returns A promise that resolves to the number of affected rows.
   */
  public async deleteByWhere(where: WhereOptions<T>): Promise<number> {
    //await this.logger.debug(`Call service deleteByWhere`);
    return this.repository.deleteByWhere(where);
  }

  /**
   * Counts the number of records in the repository.
   *
   * @param where - The condition to count the records.
   * @returns A promise that resolves to the number of records.
   */
  public async count(where?: WhereOptions<T>): Promise<number> {
    //await this.logger.debug(`Call service count`);
    return this.repository.count(where);
  }
}

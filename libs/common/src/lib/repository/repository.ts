import {
  CreateOptions,
  DatabaseError,
  IncludeOptions,
  ModelStatic,
  QueryTypes,
  WhereOptions,
} from 'sequelize';
import { Model } from 'sequelize-typescript';
import { AbstractRepository } from './repository.abstract';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { DatabaseErrorParent } from 'sequelize/types/errors/database-error';

/**
 * A generic repository class that provides basic CRUD operations for a given model.
 *
 * @template T - The type of the model that this repository manages.
 *
 * @class Repository
 *
 * @implements {AbstractRepository<T>}
 *
 * @param {ModelStatic<T>} model - The model that this repository manages.
 *
 * @returns {Repository<T>} An instance of the repository class.
 *
 * @example
 * ```ts
 * import { Injectable } from '@nestjs/common';
 * import { Repository } from '@app/common/repository';
 * import { User } from '@app/common/database/auth/entity/user.entity';
 *
 * @Injectable()
 * export class UserRepository extends Repository<User> {
 *  constructor() {
 *    super(User);
 *  }
 * }
 * ```
 */

export class Repository<T extends Model<T>> implements AbstractRepository<T> {
  constructor(protected model: ModelStatic<T>) {}

  /**
   * @method findAll
   *
   * Retrieves all records from the database.
   * This method returns a promise that resolves to an array of records.
   *
   * @returns {Promise<T[]>} A promise that resolves to an array of records.
   * @throws {DatabaseError} If there is an error during the find operation.
   */
  public async findAll(
    where?: WhereOptions<T>,
    options?: IncludeOptions,
  ): Promise<T[]> {
    try {
      if (!options?.order) {
        options = {
          ...options,
          order: [['id', 'ASC']],
        };
      }

      const founded = await this.model.findAll({
        where,
        ...options,
      });

      return founded.map((data) => data.get({ plain: true }));
    } catch (error) {
      throw new DatabaseError(error as DatabaseErrorParent);
    }
  }

  /**
   * @method findById
   *
   * Finds a record by its unique identifier.
   * This method returns a promise that resolves to the found record.
   *
   * @param id - The unique identifier of the record to find.
   * @returns A promise that resolves to the found record, or rejects with an error if the operation fails.
   * @throws {DatabaseError} If there is an error during the find operation.
   */
  public async findById(id: number): Promise<T> {
    try {
      const data = await this.model.findOne({
        where: {
          id,
        } as WhereOptions,
      });
      return data?.get() as T;
    } catch (error) {
      throw new DatabaseError(error as DatabaseErrorParent);
    }
  }

  /**
   * @method findByPk
   *
   * Finds a record by its primary key.
   * This method returns a promise that resolves to the found record.
   *
   * @param sid - The primary key of the record to find.
   * @returns A promise that resolves to the found record, or rejects with a DatabaseError if an error occurs.
   */
  public async findByPk(sid: string): Promise<T> {
    try {
      const data = await this.model.findByPk(sid);
      return data?.get() as T;
    } catch (error) {
      throw new DatabaseError(error as DatabaseErrorParent);
    }
  }

  /**
   * @method create
   *
   * Creates a new instance of the model with the provided data.
   * The data can have optional nullish values.
   *
   * @param data - The data to create the new instance with. This data can have optional nullish values.
   * @returns A promise that resolves to the created instance of the model.
   * @throws {DatabaseError} If there is an error during the creation process.
   */
  public async create(
    data: MakeNullishOptional<T['_creationAttributes']>,
    options?: CreateOptions<T['_creationAttributes']>,
  ): Promise<T> {
    try {
      const result = await this.model.create(data, {
        ...options,
        fields: Object.keys(data) as (keyof T['_creationAttributes'])[],
        returning: true,
      });

      return result.get({ plain: true });
    } catch (error) {
      throw new DatabaseError(error as DatabaseErrorParent);
    }
  }

  /**
   * @method update
   *
   * Updates a record in the database with the specified ID using the provided data.
   * The data can have optional nullish values.
   *
   * @param id - The unique identifier of the record to update.
   * @param data - The data to update the record with, allowing nullish optional fields.
   * @returns A promise that resolves to an array containing the number of affected rows.
   * @throws {DatabaseError} If an error occurs during the update operation.
   */
  public update(
    id: number,
    data: MakeNullishOptional<T['_creationAttributes']>,
  ): Promise<[number]> {
    return this.model
      .update(data, {
        where: {
          id,
        } as WhereOptions,
      })
      .catch((error) => {
        throw new DatabaseError(error as DatabaseErrorParent);
      });
  }

  /**
   * @method delete
   *
   * Deletes a record from the database based on the provided ID.
   * This method returns a promise that resolves when the record is deleted.
   *
   * @param {number} id - The ID of the record to be deleted.
   * @returns {Promise<any>} A promise that resolves when the record is deleted.
   * @throws {DatabaseError} Throws an error if the deletion fails.
   */
  public delete(id: number): Promise<any> {
    return this.model
      .destroy({
        where: {
          id,
        } as WhereOptions,
      })
      .catch((error) => {
        throw new DatabaseError(error as DatabaseErrorParent);
      });
  }

  /**
   * @method storedProcedure
   *
   * Executes a stored procedure with the given name and parameters.
   * This method returns a promise that resolves with the result of the stored procedure.
   *
   * @param spName - The name of the stored procedure to execute.
   * @param parameter - An object containing the parameters to bind to the stored procedure.
   * @returns A promise that resolves with the result of the stored procedure execution.
   * @throws {DatabaseError} If there is an error executing the stored procedure.
   */
  public storedProcedure(
    spName: string,
    parameter: Record<string, any>,
  ): Promise<any> {
    console.log(parameter);
    let query = `${spName}`;
    const keys = Object.keys(parameter);
    if (keys.length > 0) {
      query += ' ';
      keys.forEach((key, index) => {
        const params = `@${key} = :${key}`;
        query += `${params}`;
        if (index < keys.length - 1) {
          query += ', ';
        }
      });
    }

    const sequelize = this.model.sequelize;
    if (!sequelize) {
      throw new Error('Sequelize instance is not available');
    }

    return sequelize
      .query(query, {
        type: QueryTypes.RAW,
        bind: parameter,
      })
      .catch((error) => {
        throw new DatabaseError(error as DatabaseErrorParent);
      });
  }

  /**
   * @method findByWhere
   *
   * Finds a record by a specified condition.
   * This method returns a promise that resolves to the found record.
   *
   * @param where - The condition to find the record.
   * @returns A promise that resolves to the found record, or rejects with a DatabaseError if an error occurs.
   */
  public async findByWhere(
    where: WhereOptions<T>,
    options?: IncludeOptions,
  ): Promise<T | T[] | null> {
    try {
      const founded = await this.model.findAll({
        where,
        ...options,
      });

      if (founded.length === 1) return founded[0];
      else if (founded.length > 1) return founded;
      return null;
    } catch (error) {
      throw new DatabaseError(error as DatabaseErrorParent);
    }
  }

  /**
   * @method updateByWhere
   *
   * Updates a record by a specified condition.
   * This method returns a promise that resolves to an array containing the number of affected rows.
   *
   * @param where - The condition to find the record.
   * @param data - The new data for the record.
   * @returns A promise that resolves to an array containing the number of affected rows.
   * @throws {DatabaseError} If an error occurs during the update operation.
   */
  public updateByWhere(where: WhereOptions<T>, data: T): Promise<[number]> {
    return this.model
      .update(data, {
        where,
      })
      .catch((error) => {
        throw new DatabaseError(error as DatabaseErrorParent);
      });
  }
}

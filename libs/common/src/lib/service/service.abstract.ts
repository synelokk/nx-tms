import { ClassConstructor, ClassTransformOptions } from 'class-transformer';
import { IService } from './service.interface';
import { IncludeOptions, WhereOptions } from 'sequelize';

/**
 * Abstract class representing a generic service with common CRUD operations.
 * This class should be extended by specific service implementations.
 *
 * @template T - The type of the entity that the service will handle.
 */
export abstract class AbstractService<T> implements IService<T> {
  /**
   * Retrieves all entities.
   *
   * @returns A promise that resolves to an array of entities.
   */
  public abstract findAll<R>(
    mapDto?: ClassConstructor<R>,
    where?: WhereOptions<T>,
    options?: IncludeOptions,
  ): Promise<T[] | R[]>;

  /**
   * Finds an entity by its primary key.
   *
   * @param sid - The primary key of the entity.
   * @returns A promise that resolves to the entity.
   */
  public abstract findByPk(sid: string): Promise<T>;

  /**
   * Finds an entity by its ID.
   *
   * @param id - The ID of the entity.
   * @returns A promise that resolves to the entity.
   */
  public abstract findById(id: number): Promise<T>;

  /**
   * Finds an entity by condition.
   *
   * @param where - The condition to find the entity.
   * @returns A promise that resolves to the found entity.
   */
  public abstract findOne(where: WhereOptions<T>): Promise<T>;

  /**
   * Creates a new entity.
   *
   * @param data - The data for the new entity.
   * @returns A promise that resolves to the created entity.
   */
  public abstract create<R>(
    data: any,
    mapDto?: {
      dto?: ClassConstructor<R>;
      options?: ClassTransformOptions;
    },
  ): Promise<T | R>;

  /**
   * Updates an existing entity.
   *
   * @param id - The ID of the entity to update.
   * @param data - The new data for the entity.
   * @returns A promise that resolves to an array containing the number of affected rows.
   */
  public abstract update(id: number, data: any): Promise<[number]>;

  /**
   * Deletes an entity by its ID.
   *
   * @param id - The ID of the entity to delete.
   * @returns A promise that resolves to the number of affected rows.
   */
  public abstract delete(id: number): Promise<number>;

  /**
   * Executes a stored procedure.
   *
   * @param spName - The name of the stored procedure.
   * @param parameter - The parameters for the stored procedure.
   * @returns A promise that resolves to the result of the stored procedure.
   */
  public abstract storedProcedure(spName: string, parameter: any): Promise<any>;

  /**
   * @method findByWhere
   *
   * Finds an entity by a specified condition.
   * This method returns a promise that resolves to the found entity.
   *
   * @param {WhereOptions<T>} where - The condition to find the entity.
   * @returns {Promise<T>} A promise that resolves to the found entity.
   */
  public abstract findByWhere(
    where?: WhereOptions<T>,
    options?: IncludeOptions,
  ): Promise<T | T[] | null>;

  /**
   * @method updateByWhere
   *
   * Updates entities that meet the specified condition.
   * This method returns a promise that resolves to an array containing the number of affected rows.
   *
   * @param {WhereOptions<T>} where - The condition to update the entities.
   * @param {any} data - The new data for the entities.
   * @returns {Promise<[number]>} A promise that resolves to an array containing the number of affected rows.
   */
  public abstract updateByWhere(
    where: WhereOptions<T>,
    data: any,
  ): Promise<[number]>;

  /**
   * @method deleteByWhere
   *
   * Deletes entities that meet the specified condition.
   * This method returns a promise that resolves to the number of affected rows.
   *
   * @param {WhereOptions<T>} where - The condition to delete the entities.
   * @returns {Promise<number>} A promise that resolves to the number of affected rows.
   */
  public abstract deleteByWhere(where: WhereOptions<T>): Promise<number>;

  /**
   * @method count
   *
   * Counts the number of entities that meet the specified condition.
   * This method returns a promise that resolves to the number of entities.
   *
   * @param {WhereOptions<T>} where - The condition to count the entities.
   * @returns {Promise<number>} A promise that resolves to the number of entities.
   */
  public abstract count(where?: WhereOptions<T>): Promise<number>;
}

import { CreateOptions, IncludeOptions, WhereOptions } from 'sequelize';
import { IAbstractRepository } from './repository.interface';

/**
 * Abstract class representing a generic repository.
 * This class defines the basic CRUD operations and a method for executing stored procedures.
 *
 * @template T - The type of the entity that the repository manages.
 *
 * @implements IAbstractRepository<T>
 */
export abstract class AbstractRepository<T> implements IAbstractRepository<T> {
  /**
   * @method findAll
   *
   * Retrieves all records from the database.
   * This method returns a promise that resolves to an array of records.
   *
   * @param where - The condition to find the entity.
   * @param options - The options for finding the entity.
   * @returns A promise that resolves to an array of records.
   * @throws {DatabaseError} If there is an error during the find operation.
   *
   */

  public abstract findAll(
    where: WhereOptions<T>,
    options?: IncludeOptions,
  ): Promise<T[]>;

  /**
   * @method findById
   *
   * Finds an entity by its ID.
   * This method returns a promise that resolves to the found entity.
   *
   * @param id - The ID of the entity to find.
   * @returns A promise that resolves to the found entity.
   */
  public abstract findById(id: number): Promise<T>;

  /**
   * @method findByPk
   *
   * Finds an entity by its primary key.
   * This method returns a promise that resolves to the found entity.
   *
   * @param sid - The primary key of the entity to find.
   * @returns A promise that resolves to the found entity.
   */
  public abstract findByPk(sid: string): Promise<T>;

  /**
   * @method create
   *
   * Creates a new entity.
   * This method returns a promise that resolves to the created entity.
   *
   * @param data - The data for the new entity.
   * @param options - The options for creating the entity.
   * @returns A promise that resolves to the created entity.
   */
  public abstract create(data: any, options?: CreateOptions<T>): Promise<T>;

  /**
   * @method update
   *
   * Updates an existing entity.
   * This method returns a promise that resolves to an array containing the number of affected rows.
   *
   * @param id - The ID of the entity to update.
   * @param data - The new data for the entity.
   * @returns A promise that resolves to an array containing the number of affected rows.
   */
  public abstract update(id: number, data: any): Promise<[number]>;

  /**
   * @method delete
   *
   * Deletes an entity.
   * This method returns a promise that resolves to the number of affected rows.
   *
   * @param id - The ID of the entity to delete.
   * @returns A promise that resolves to the number of affected rows.
   */
  public abstract delete(id: number): Promise<number>;

  /**
   * @method storedProcedure
   *
   * Executes a stored procedure.
   * This method returns a promise that resolves to the result of the stored procedure.
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
    where: WhereOptions<T>,
    options?: IncludeOptions,
  ): Promise<T | T[] | null>;

  /**
   * @method updateByWhere
   *
   * Updates an entity by a specified condition.
   * This method returns a promise that resolves to an array containing the number of affected rows.
   *
   * @param {WhereOptions<T>} where - The condition to find the entity.
   * @param {T} data - The new data for the entity.
   * @returns {Promise<[number]>} A promise that resolves to an array containing the number of affected rows
   * @throws {DatabaseError} If an error occurs during the update operation.
   */
  public abstract updateByWhere(
    where: WhereOptions<T>,
    data: T,
  ): Promise<[number]>;
}

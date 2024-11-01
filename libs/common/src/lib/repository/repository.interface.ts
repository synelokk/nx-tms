import { IncludeOptions, WhereOptions } from 'sequelize';

/**
 * Interface representing a generic repository with common CRUD operations.
 *
 * @template T - The type of the entity.
 */
export interface IAbstractRepository<T> {
  /**
   * Finds all entities that match the specified condition.
   * This method returns a promise that resolves to an array of entities.
   *
   * @param where - The condition to find the entities.
   * @param options - Optional include options to specify related models to include in the result.
   * @returns A promise that resolves to an array of entities that match the specified condition.
   */
  findAll(where: WhereOptions<T>, options?: IncludeOptions): Promise<T[]>;

  /**
   * @method findById
   *
   * Finds an entity by its ID.
   * This method returns a promise that resolves to the entity.
   *
   * @param id - The ID of the entity.
   * @returns A promise that resolves to the entity.
   */
  findById(id: number): Promise<T>;

  /**
   * @method findByPk
   *
   * Finds an entity by its primary key.
   * This method returns a promise that resolves to the found entity.
   *
   * @param sid - The primary key of the entity.
   * @returns A promise that resolves to the entity.
   */
  findByPk(sid: string): Promise<T>;

  /**
   * @method create
   *
   * Creates a new entity.
   * This method returns a promise that resolves to the created entity.
   *
   * @param data - The data for the new entity.
   * @returns A promise that resolves to the created entity.
   */
  create(data: any): Promise<T>;

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
  update(id: number, data: any): Promise<[number]>;

  /**
   * @method delete
   *
   * Deletes an entity by its ID.
   * This method returns a promise that resolves to the number of affected rows.
   *
   * @param id - The ID of the entity to delete.
   * @returns A promise that resolves to the number of affected rows.
   */
  delete(id: number): Promise<number>;

  /**
   * @method storedProcedure
   *
   * Executes a stored procedure.
   *
   * @param spName - The name of the stored procedure.
   * @param parameter - The parameters for the stored procedure.
   * @returns A promise that resolves to the result of the stored procedure.
   */
  storedProcedure(spName: string, parameter: any): Promise<any>;
}

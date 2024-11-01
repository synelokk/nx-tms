import { ClassConstructor } from 'class-transformer';
import { IService } from './service.interface';

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
  public abstract findAll<R>(mapDto?: ClassConstructor<R>): Promise<T[] | R[]>;

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
   * Creates a new entity.
   *
   * @param data - The data for the new entity.
   * @returns A promise that resolves to the created entity.
   */
  public abstract create<R>(
    data: any,
    mapDto?: ClassConstructor<R>,
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
}

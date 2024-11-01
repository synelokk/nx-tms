/**
 * Interface representing a generic service with common CRUD operations.
 *
 * @template T - The type of the resource.
 */
export interface IService<T> {
  /**
   * Retrieves all resources.
   *
   * @returns A promise that resolves to an array of all resources.
   */
  findAll(): Promise<T[]>;

  /**
   * Finds a resource by its primary key.
   *
   * @param sid - The primary key of the resource.
   * @returns A promise that resolves to the found resource.
   */
  findByPk(sid: string): Promise<T>;

  /**
   * Finds a resource by its ID.
   *
   * @param id - The ID of the resource.
   * @returns A promise that resolves to the found resource.
   */
  findById(id: number): Promise<T>;

  /**
   * Creates a new resource.
   *
   * @param data - The data for the new resource.
   * @returns A promise that resolves to the created resource.
   */
  create(data: any): Promise<T>;

  /**
   * Updates an existing resource.
   *
   * @param id - The ID of the resource to update.
   * @param data - The new data for the resource.
   * @returns A promise that resolves to an array containing the number of affected rows.
   */
  update(id: number, data: any): Promise<[number]>;

  /**
   * Deletes a resource by its ID.
   *
   * @param id - The ID of the resource to delete.
   * @returns A promise that resolves to the number of affected rows.
   */
  delete(id: number): Promise<number>;

  /**
   * Executes a stored procedure.
   *
   * @param spName - The name of the stored procedure.
   * @param parameter - The parameters for the stored procedure.
   * @returns A promise that resolves to the result of the stored procedure.
   */
  storedProcedure(spName: string, parameter: any): Promise<any>;
}

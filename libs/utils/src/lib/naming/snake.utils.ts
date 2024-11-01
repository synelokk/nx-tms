import { INamingStrategy } from './naming.interface';

function toSnakeCase<T>(str: string): T {
  return str.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`) as T;
}

export class SnakeCaseNamingStrategy implements INamingStrategy {
  public serialize<T>(name: any): T {
    return toSnakeCase(name);
  }

  public deserialize<T>(name: any): T {
    return toSnakeCase(name);
  }
}

import { INamingStrategy } from './naming.interface';

function toCamelCase<T>(str: string): T {
  return str.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', '')
  ) as T;
}

export class CamelCaseNamingStrategy implements INamingStrategy {
  public serialize<T>(name: any): T {
    return toCamelCase<T>(name);
  }

  public deserialize<T>(name: any): T {
    return toCamelCase<T>(name);
  }
}

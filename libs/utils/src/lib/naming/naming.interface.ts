export interface INamingStrategy {
  serialize<T>(name: string): T;
  deserialize<T>(name: string): T;
}

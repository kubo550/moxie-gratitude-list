export class LocalStorage {
  private static instance: LocalStorage;
  private storage: Storage;

  private constructor() {
    this.storage = window.localStorage;
  }

  public static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  public setItem(key: string, value: Record<string, unknown>) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public removeItem(key: string) {
    this.storage.removeItem(key);
  }

  public clear() {
    this.storage.clear();
  }

  public setArrayItem(key: string, value: unknown[]) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public getArrayItem<T>(key: string): T[] {
    return this.getItem<T[]>(key) || [];
  }

  public pushArrayItem<T>(key: string, value: T) {
    const existingArray = this.getArrayItem<T>(key);
    existingArray.push(value);
    this.setArrayItem(key, existingArray);
  }

  public getArrayItemById<T extends { id: string | number }>(key: string, id: string): T | null {
    const items = this.getArrayItem<T>(key);
    return items.find((item) => item.id === id) || null;
  }

  public removeArrayItemById<T extends { id: string | number }>(key: string, id: string | number) {
    const items = this.getArrayItem<T>(key);
    const updatedItems = items.filter((item: T) => item.id.toString() !== id.toString());
    this.setArrayItem(key, updatedItems);
  }
}

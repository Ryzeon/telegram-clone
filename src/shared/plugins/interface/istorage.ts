export interface IStorage {
    setItem(key: string, value: any): void;

    getItem(key: string): any;

    removeItem(key: string): void;

    clear(): void;
}
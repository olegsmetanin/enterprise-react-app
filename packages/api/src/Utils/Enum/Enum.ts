// https://github.com/dphilipson/typescript-string-enums
export function Enum<V extends string>(...values: V[]): { [K in V]: K } {
    const result: any = {};
    values.forEach((value) => result[value] = value);
    return result;
}

export type Enum<T> = T[keyof T];
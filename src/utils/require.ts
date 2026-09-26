type Value<T> = T | null | undefined;

function require<T>(value: Value<T>): T {
    if(value == null) throw Error("Value not set");
    return value;
}

type Reference<T> = {
    current: Value<T>;
}

function requireRef<T>(ref: Reference<T>): T {
    return require(ref.current);
}

export { require, requireRef };
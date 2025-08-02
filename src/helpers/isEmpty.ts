export default function isEmptyArray<T>(array: T[]): boolean {
  return !Array.isArray(array) || array.length === 0;
}

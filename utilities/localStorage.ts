export const namespace = 'life-forge.'

/**
 * Get a given storage value by its key.
 */
export function getLocalStorageValue(key: string): unknown {
  const item = localStorage.getItem(namespaceLocalStorageKey(key))
  return item === null ? undefined : JSON.parse(item)
}

/**
 * Set a given storage value by its key.
 */
export function setLocalStorageValue(key: string, value: unknown): void {
  localStorage.setItem(namespaceLocalStorageKey(key), JSON.stringify(value))
}

/**
 * Remove a given storage value by its key.
 */
export function unsetLocalStorageValue(key: string): void {
  localStorage.removeItem(namespaceLocalStorageKey(key))
}

/**
 * Check if the given key is in our storage namespace.
 */
export function isLocalStorageNamespaceKey(key: string): boolean {
  return key.startsWith(namespaceLocalStorageKey(key))
}

/**
 * Add our storage namespace prefix to the given key.
 */
export function namespaceLocalStorageKey(key: string): string {
  return `${namespace}${key}`
}

/**
 * Remove our storage namespace prefix from the given key.
 */
export function unnamespaceLocalStorageKey(
  namespace: string,
  namespacedKey: string
): string {
  return namespacedKey.slice(namespace.length)
}

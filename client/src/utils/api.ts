export function api(path: string, config?: RequestInit) {
  const BASE_URL = import.meta.env.BASE_URL

  return fetch(BASE_URL + path, config)
}

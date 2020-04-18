export function uniqueRequestByKeepLast(requests, key) {
  return [
    ...new Map(
      requests.map(x => [key(x), x])
    ).values()
  ]
}
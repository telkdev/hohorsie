export type Milliseconds = number

export function toSeconds(milliseconds: Milliseconds) {
  return milliseconds / 1000
}

export function makeTime() {
  return +new Date()
}

export function makeLocaleTime(date = new Date()) {
  return date.toLocaleTimeString()
}

// @ts-check

/**
 * Formats a percentage. Ex: .12 => '12%'
 *
 * @export
 * @param {number} value
 * @returns
 */
export function percentage (value) {
  return `${Math.round(value*100).toLocaleString()}%`
}

/**
 * Format an amount of money which is formatted using localization. Ex: 15.05 => '$15.05'
 *
 * @export
 * @param {number} value
 * @returns
 */
export function money (value) {
  return `$${value.toLocaleString()}`
}

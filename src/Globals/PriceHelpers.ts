const findUserLang = (storeName: string, storeLocale: string): string => {
  switch (storeName) {
    case 'stores/4':
      return 'da-DK'
    case 'stores/12':
      return 'nl-BE'
    case 'stores/18':
      return 'de-DE'
    case 'stores/20':
      return 'de-CH'
    case 'stores/31':
      return 'en-US'
    default:
      return storeLocale
  }
}

const formatNumber = (
  storeName: string,
  storeLocale: string,
  number: number,
  decimals?: number,
): string => {
  let decimalsToUse = decimals
  if (!decimalsToUse) {
    decimalsToUse = number % 1 > 0 ? 2 : 0
  }

  const userLang = findUserLang(storeName, storeLocale)
  return parseFloat(number.toFixed(decimalsToUse)).toLocaleString(userLang, {
    minimumFractionDigits: decimalsToUse,
  })
}

export const formatPrice = (
  storeName: string,
  storeLocale: string,
  price: number,
  decimals?: number,
): string => {
  const formattedNumber = formatNumber(storeName, storeLocale, price, decimals)

  switch (storeName) {
    case 'stores/1':
    case 'stores/3':
    case 'stores/4':
      return `${formattedNumber} kr`
    case 'stores/5':
    case 'stores/15':
    case 'stores/18':
    case 'stores/21':
      return `€${formattedNumber}`
    case 'stores/6':
    case 'stores/7':
    case 'stores/10':
    case 'stores/11':
    case 'stores/12':
    case 'stores/14':
    case 'stores/23':
    case 'stores/24':
    case 'stores/26':
      return `${formattedNumber} €`
    case 'stores/8':
      return `£${formattedNumber}`
    case 'stores/9':
      return `${formattedNumber} Kč`
    case 'stores/16':
      return `${formattedNumber} zł`
    case 'stores/17':
      return `${formattedNumber} Ft`
    case 'stores/19':
    case 'stores/20':
      return `CHF ${formattedNumber}`
    case 'stores/22':
      return `${formattedNumber} лв.`
    case 'stores/25':
      return `${formattedNumber} Lei`
    case 'stores/27':
    case 'stores/28':
    case 'stores/32':
    case 'stores/36':
      return `$${formattedNumber}`
    case 'stores/29':
      return `SGD ${formattedNumber}`
    case 'stores/31':
      return `R ${formattedNumber}`
    case 'stores/33':
      return `CAD $${formattedNumber}`
    case 'stores/34':
      return `${formattedNumber} $ CAD`
    default:
      return formattedNumber
  }
}

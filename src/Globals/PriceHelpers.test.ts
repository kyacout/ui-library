import { formatPrice } from './PriceHelpers'

describe('formatPrice', () => {
  test.each([
    ['stores/8', 'en-GB', 100, null, '£100'],
    ['stores/8', 'en-GB', 0.91, null, '£0.91'],
    ['stores/8', 'en-GB', 0.91, 1, '£0.9'],
    ['stores/30', 'ar-AE', 16.75, null, '١٦٫٧٥'],
    ['stores/35', 'en-AE', 16.75, null, '16.75'],
    ['stores/18', 'de-AT', 16.75, null, '€16,75'],
    ['stores/28', 'en-AU', 16.75, null, '$16.75'],
    ['stores/11', 'nl-BE', 16.75, null, '16,75 €'],
    ['stores/22', 'bg-BG', 16.75, null, '16,75 лв.'],
    ['stores/33', 'en-CA', 16.75, null, 'CAD $16.75'],
    ['stores/34', 'fr-CA', 16.75, null, '16,75 $ CAD'],
    ['stores/19', 'de-CH', 16.75, null, 'CHF 16.75'],
    ['stores/20', 'fr-CH', 16.75, null, 'CHF 16.75'],
    ['stores/9', 'cs-CZ', 16.75, null, '16,75 Kč'],
    ['stores/7', 'de-DE', 16.75, null, '16,75 €'],
    ['stores/1', 'da-DK', 16.75, null, '16,75 kr'],
    ['stores/14', 'es-ES', 16.75, null, '16,75 €'],
    ['stores/6', 'fi-FI', 16.75, null, '16,75 €'],
    ['stores/10', 'fr-FR', 16.75, null, '16,75 €'],
    ['stores/23', 'el-GR', 16.75, null, '16,75 €'],
    ['stores/17', 'hu-HU', 16.75, null, '16,75 Ft'],
    ['stores/21', 'en-IE', 16.75, null, '€16.75'],
    ['stores/15', 'it-IT', 16.75, null, '€16,75'],
    ['stores/5', 'nl-NL', 16.75, null, '€16,75'],
    ['stores/3', 'nb-NO', 16.75, null, '16,75 kr'],
    ['stores/32', 'en-NZ', 16.75, null, '$16.75'],
    ['stores/16', 'pl-PL', 16.75, null, '16,75 zł'],
    ['stores/24', 'pt-PT', 16.75, null, '16,75 €'],
    ['stores/25', 'ro-RO', 16.75, null, '16,75 Lei'],
    ['stores/13', 'ru-RU', 16.75, null, '16,75'],
    ['stores/4', 'sv-SE', 16.75, null, '16,75 kr'],
    ['stores/29', 'en-SG', 16.75, null, 'SGD 16.75'],
    ['stores/26', 'sk-SK', 16.75, null, '16,75 €'],
    ['stores/8', 'en-GB', 16.75, null, '£16.75'],
    ['stores/27', 'en-US', 16.75, null, '$16.75'],
    ['stores/36', 'es-US', 16.75, null, '$16.75'],
    ['stores/31', 'en-ZA', 16.75, null, 'R 16.75'],
    ['stores/12', 'fr-BE', 16.75, null, '16,75 €'],

  ])('formatPrice(%s, %s, %f, %s) -> %s', (
    storeName: string,
    storeLocal: string,
    price: number,
    decimals: number,
    expected: string,
  ) => {
    expect(formatPrice(storeName, storeLocal, price, decimals)).toStrictEqual(expected)
  })
})

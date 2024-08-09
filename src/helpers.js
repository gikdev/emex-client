import { enumToText } from "@/enums"
import { PersianDate, addCommaToPrice, persianifyNumber, priceToRial, priceToToman } from "@/utils"

const formatters = {
  date: p => new PersianDate(p.value).toLocaleDateString(),
  debt: p => {
    const { value } = p

    const volume = value < 0 ? value * -1 : value
    const volumeToShow = priceToRial(volume, 4)
    console.log({ value, volume, volumeToShow })

    return `${volumeToShow} ${value < 0 ? "(بدهکار)" : "(بستانکار)"}`
  },
  orderSide: p => enumToText("ORDER_SIDE", p.value),
  orderStatus: p => enumToText("ORDER_STATUS", p.value),
  persianComma: p => addCommaToPrice(persianifyNumber(p.value)),
  persianNumber: p => persianifyNumber(p.value),
  rial: p => priceToRial(p.value),
  toman: p => priceToToman(p.value),
}

export { formatters }
export * from "emex-shared/helpers"

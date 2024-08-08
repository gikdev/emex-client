import { enumToText } from "@/enums"
import { PersianDate, addCommaToPrice, persianifyNumber, priceToRial, priceToToman } from "@/utils"

const formatters = {
  date: p => new PersianDate(p.value).toLocaleDateString(),
  orderSide: p => enumToText("ORDER_SIDE", p.value),
  orderStatus: p => enumToText("ORDER_STATUS", p.value),
  persianComma: p => addCommaToPrice(persianifyNumber(p.value)),
  persianNumber: p => persianifyNumber(p.value),
  rial: p => priceToRial(p.value),
  toman: p => priceToToman(p.value),
}

export { formatters }
export * from "emex-shared/helpers"

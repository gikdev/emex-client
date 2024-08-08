import { TableFa } from "@/components"
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

const COLUMN_DEFINITIONS = [
  { field: "id", headerName: "آیدی", valueFormatter: formatters.persianNumber },
  { field: "time", headerName: "آخرین به روز رسانی", valueFormatter: formatters.date },
  { field: "tyStockID", headerName: "آیدی محصول", valueFormatter: formatters.persianNumber },
  { field: "stockName", headerName: "نام محصول" },
  { field: "orderStatus", headerName: "وضعیت سفارش", valueFormatter: formatters.orderStatus },
  { field: "side", headerName: "نوع سفارش", valueFormatter: formatters.orderSide },
  { field: "price", headerName: "قیمت", valueFormatter: formatters.rial },
  { field: "volume", headerName: "مقدار", valueFormatter: formatters.persianNumber },
  { field: "value", headerName: "ارزش معامله (ریال)", valueFormatter: formatters.persianComma },
]

function OrdersTable() {
  return <TableFa columnDefs={COLUMN_DEFINITIONS} />
}

export { OrdersTable }

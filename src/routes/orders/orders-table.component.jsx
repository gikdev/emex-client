import { TableFa } from "@/components"
import { apiEndpoints, fetcher, formatters } from "@/helpers"
import { useSWR } from "swr"

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

const config = apiEndpoints.customer.orders
const fetcherConfig = {
  method: config.method,
  headers: apiHelper.header.jsonAndBearer,
  // body: dataToSend,
  // WHAT TO SEND???
}

function OrdersTable() {
  // const response = useSWR(config.url, fetcher(fetcherConfig))

  return <TableFa columnDefs={COLUMN_DEFINITIONS} />
}

export { OrdersTable }

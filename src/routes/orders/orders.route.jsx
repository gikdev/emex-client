import { Heading, Hr } from "@/components"
import { OrdersTable } from "./orders-table.component"

function Orders() {
  return (
    <>
      <Heading as="h1" size={5} className="text-slatedark-12 mb-4 mt-6 text-center">
        سفارشات
      </Heading>
      <Hr />
      <section className="p-4 md:p-8 h-full">
        <OrdersTable />
      </section>
    </>
  )
}

export { Orders }

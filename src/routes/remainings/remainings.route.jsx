import { Heading, Hr } from "@/components"
import { RemainingsTable } from "./remainings-table.component"

function Remainings() {
  return (
    <>
      <Heading as="h1" size={5} className="text-slatedark-12 mb-4 mt-6 text-center">
        مانده حساب
      </Heading>
      <Hr />
      <section className="h-full p-8">
        <RemainingsTable />
      </section>
    </>
  )
}

export { Remainings }

import { Heading, Hr } from "@/components"
import { useGetMasterInfo } from "@/services"

function Rules() {
  const rules = useGetMasterInfo("rulls")

  return (
    <>
      <Heading as="h1" size={5} className="text-slatedark-12 mb-4 mt-6 text-center">
        شرایط و قوانین
      </Heading>
      <Hr />
      <section className="p-4 md:p-8 text-center">
        <p>{rules}</p>
      </section>
    </>
  )
}

export { Rules }

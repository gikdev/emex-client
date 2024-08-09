import { Heading, Hr } from "@/components"
import { useGetMasterInfo } from "@/services"

function About() {
  const aboutUs = useGetMasterInfo("aboutUs")

  return (
    <>
      <Heading as="h1" size={5} className="text-slatedark-12 mb-4 mt-6 text-center">
        درباره ما
      </Heading>
      <Hr />
      <section className="p-4 md:p-8 text-center">
        <p>{aboutUs}</p>
      </section>
    </>
  )
}

export { About }

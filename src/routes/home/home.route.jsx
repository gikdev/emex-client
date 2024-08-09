import { Heading, Hr } from "@/components"
import { useGetMasterInfo } from "@/services"

function Home() {
  const mainPage = useGetMasterInfo("mainPage")

  return (
    <>
      <Heading as="h1" size={5} className="text-slatedark-12 mb-4 mt-6 text-center">
        صفحه اصلی
      </Heading>
      <Hr />
      <section className="p-8 text-center">
        <p>{mainPage}</p>
      </section>
    </>
  )
}

export { Home }

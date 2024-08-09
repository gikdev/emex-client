import { Btn, ErrorCard, Heading, Hr, LoadingSpinner } from "@/components"
import { useSignalRContext } from "@/contexts"
import { apiEndpoints, apiHelper, fetcher } from "@/helpers"
import { ArrowClockwise } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import useSWR from "swr"
import tw from "tailwind-styled-components"
import { ProductCard } from "./product-card.component"

const GridContainer = tw.div`flex flex-wrap gap-4 p-8 justify-center items-start`
const config = apiEndpoints.customer.stocks

function Trade() {
  const { connectionRef } = useSignalRContext()
  const [products, setProducts] = useState(null)
  const productsResponse = useSWR(config.url, fetcher({ headers: apiHelper.header.bearer }), {
    refreshInterval: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  useEffect(() => {
    if (!productsResponse.data) return
    setProducts(productsResponse.data)
  }, [productsResponse])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!products || !productsResponse.data) return
    connectionRef.current.on("ReceivePriceUpdate", handlePriceChange)

    const cleanup = () => connectionRef.current.off("ReceivePriceUpdate", handlePriceChange)
    return cleanup
  }, [products, productsResponse.data])

  function handlePriceChange(stockID, newPrice, priceType, date) {
    const clonedProducts = [...products]
    const targetStockIndex = clonedProducts.findIndex(product => product.id === stockID)
    clonedProducts[targetStockIndex][priceType] = Number(newPrice)
    clonedProducts[targetStockIndex].dateUpdate = date
    setProducts(clonedProducts)
  }

  return (
    <>
      <Heading as="h1" size={5} className="text-slatedark-12 mb-4 mt-6 text-center">
        معاملات
      </Heading>
      <Hr />
      <Btn className="mt-5 mx-auto" icon={ArrowClockwise} onClick={() => productsResponse.mutate()}>
        تازه سازی
      </Btn>
      <GridContainer>
        <ErrorBoundary FallbackComponent={ErrorCard}>
          {productsResponse.isLoading && <LoadingSpinner />}
          {products &&
            !!products.length &&
            products.map(product => <ProductCard {...product} key={product.id} />)}
        </ErrorBoundary>
      </GridContainer>
    </>
  )
}

export { Trade }

import { ErrorCard, Heading, Hr } from "@/components"
import { ErrorBoundary } from "react-error-boundary"
import tw from "tailwind-styled-components"
import { ProductCard } from "./product-card.component"

const GridContainer = tw.div`flex flex-wrap gap-4 p-8 justify-center items-start`

function Trade() {
  return (
    <>
      <Heading as="h1" size={5} className="text-slatedark-12 mb-4 mt-6 text-center">
        معاملات
      </Heading>
      <Hr />
      <GridContainer>
        <ErrorBoundary FallbackComponent={ErrorCard}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ErrorBoundary>
      </GridContainer>
    </>
  )
}

export { Trade }

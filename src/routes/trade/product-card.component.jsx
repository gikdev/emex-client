import { Heading, Hr } from "@/components"
import { useState } from "react"
import tw from "tailwind-styled-components"
import { Pricy } from "./pricy.component"
import { ProductForm } from "./product-form.component"

const StyledContainer = tw.div`
  bg-slatedark-2 border-2 border-slatedark-6 
  p-4 flex flex-col gap-4
  rounded-lg max-w-max
`

function ProductCard() {
  const [selectedMode, setSelectedMode] = useState("")
  const modeText = selectedMode === "buy" ? "خرید" : selectedMode === "sell" ? "فروش" : "ناشناخته"

  return (
    <StyledContainer>
      <div className="flex flex-col gap-2">
        <Heading as="h2" size={2} className="text-center">
          پسته اهواز
        </Heading>
        <p className="text-xs text-center">۱۴۰۳/۰۵/۰۸ - ۱۶:۳۲:۴۵</p>
      </div>
      <Hr />
      <div className="flex gap-4">
        <Pricy
          mode="buy"
          onBtnClick={() => {
            setSelectedMode("buy")
          }}
          isActive={selectedMode === "buy"}
        />
        <Pricy
          mode="sell"
          onBtnClick={() => {
            setSelectedMode("sell")
          }}
          isActive={selectedMode === "sell"}
        />
      </div>
      {!!selectedMode.length && (
        <>
          <Hr />
          <ProductForm modeText={modeText} onRefusion={() => setSelectedMode("")} />
        </>
      )}
    </StyledContainer>
  )
}

export { ProductCard }

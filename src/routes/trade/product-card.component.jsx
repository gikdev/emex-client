import { Heading, Hr } from "@/components"
import { useAdminContext, useSignalRContext } from "@/contexts"
import { ENUMS } from "@/enums"
import { PersianDate, getTimeFa } from "@/utils"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import tw from "tailwind-styled-components"
import { Pricy } from "./pricy.component"
import { ProductForm } from "./product-form.component"

const StyledContainer = tw.div`
  bg-slatedark-2 border-2 border-slatedark-6 
  p-4 flex flex-col gap-4 min-w-full
  rounded-lg max-w-max sm:min-w-96
`

function ProductCard({
  id,
  name,
  dateUpdate,
  price,
  diffBuyPrice,
  diffSellPrice,
  status,
  unitPriceRatio,
  decimalNumber,
  mode,
  maxAutoMin,
}) {
  // productData: { id, name, price, diffBuyPrice, diffSellPrice, dateUpdate, decimalNumber, status, mode, unitPriceRatio, maxAutoMin }
  const [selectedMode, setSelectedMode] = useState("")
  const { isOnline } = useAdminContext()
  const { connectionState } = useSignalRContext()

  const modeText = selectedMode === "buy" ? "خرید" : selectedMode === "sell" ? "فروش" : "ناشناخته"
  const lastUpdated = new PersianDate(dateUpdate)
  const updateDate = lastUpdated.toLocaleDateString()
  const updateTime = getTimeFa(lastUpdated)
  const groupDiffBuyPrice = Cookies.get("diffBuyPrice") ?? 0
  const groupDiffSellPrice = Cookies.get("diffSellPrice") ?? 0
  const totalBuyPrice = price + +groupDiffBuyPrice + +diffBuyPrice
  const totalSellPrice = price - groupDiffSellPrice - diffSellPrice
  const isBuyBtnEnabled =
    status !== ENUMS.PRODUCT_STATUS.DISABLED &&
    status !== ENUMS.PRODUCT_STATUS.SELL_ONLY &&
    isOnline &&
    connectionState === "connected"
  const isSellBtnEnabled =
    status !== ENUMS.PRODUCT_STATUS.DISABLED &&
    status !== ENUMS.PRODUCT_STATUS.BUY_ONLY &&
    isOnline &&
    connectionState === "connected"

  // If the admin went offline, close forms...
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isOnline && connectionState === "connected") return

    setSelectedMode("")
  }, [isOnline, selectedMode, connectionState])

  function handleBuyBtnClick() {
    const nextMode = selectedMode === "buy" ? "" : "buy"
    setSelectedMode(nextMode)
  }

  function handleSellBtnClick() {
    const nextMode = selectedMode === "sell" ? "" : "sell"
    setSelectedMode(nextMode)
  }

  return (
    <StyledContainer>
      <div className="flex flex-col gap-2">
        <Heading as="h2" size={2} className="text-center">
          {name}
        </Heading>
        <p className="text-xs text-center">
          {updateDate} - {updateTime}
        </p>
      </div>
      <Hr />
      <div className="flex gap-4">
        <Pricy
          mode="buy"
          btnEnabled={isBuyBtnEnabled}
          price={totalBuyPrice}
          isActive={selectedMode === "buy"}
          onBtnClick={handleBuyBtnClick}
        />
        <Pricy
          mode="sell"
          btnEnabled={isSellBtnEnabled}
          price={totalSellPrice}
          isActive={selectedMode === "sell"}
          onBtnClick={handleSellBtnClick}
        />
      </div>
      {!!selectedMode.length && (
        <>
          <Hr />
          <ProductForm
            id={id}
            totalBuyPrice={totalBuyPrice}
            totalSellPrice={totalSellPrice}
            decimalNumber={decimalNumber}
            basePrice={price}
            unitPriceRatio={unitPriceRatio}
            modeText={modeText}
            onRefusion={() => setSelectedMode("")}
            maxAutoMin={maxAutoMin}
            mode={mode}
          />
        </>
      )}
    </StyledContainer>
  )
}

export { ProductCard }

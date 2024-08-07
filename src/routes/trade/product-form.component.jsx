import { Btn, LabeledInput, LabeledSwitch, Labeler, PriceInput } from "@/components"
import { priceToToman } from "@/utils"
import { useId, useState } from "react"

function ProductForm({ onRefusion, modeText }) {
  const [weight, setWeight] = useState("")
  const [tradeValue, setTradeValue] = useState("")
  const [isBuyingInWeightMode, setIsBuyingWeightMode] = useState(true)
  const priceInputID = `price-input-${useId()}`
  const buyingModeText = isBuyingInWeightMode ? "وزنی" : "ریالی"
  const tomanTradeValue = `${priceToToman(tradeValue)} تومن`
  const isReady = tradeValue && weight

  // BUG 🐞👇🏻 fixed... 😁
  const handleSubmit = e => e.preventDefault()

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <LabeledSwitch
        checked={isBuyingInWeightMode}
        onChange={() => setIsBuyingWeightMode(p => !p)}
        labelText={`در حال ${modeText} در حالت ${buyingModeText}`}
      />

      <LabeledInput
        value={weight}
        onChange={e => setWeight(e.target.value)}
        labelTextPrimary="وزن (گرم):"
      />

      <Labeler label1="ارزش معامله (ریال):" label2={tomanTradeValue} id={priceInputID}>
        <PriceInput price={tradeValue} setPrice={setTradeValue} id={priceInputID} />
      </Labeler>

      <div className="flex gap-4">
        <Btn className="w-full" onClick={onRefusion}>
          انصراف
        </Btn>
        <Btn
          disabled={!isReady}
          className="w-full"
          theme="primary"
          themeType="filled"
          type="submit"
        >
          {modeText}
        </Btn>
      </div>
    </form>
  )
}

export { ProductForm }

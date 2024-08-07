import { Btn, LabeledInput, LabeledSwitch, Labeler, PriceInput } from "@/components"
import { priceToToman } from "@/utils"
import { useEffect, useId, useRef, useState } from "react"

function ProductForm({ onRefusion, modeText }) {
  const [weight, setWeight] = useState("")
  const [tradeValue, setTradeValue] = useState("")
  const [isBuyingInWeightMode, setIsBuyingWeightMode] = useState(true)
  const targetInputRef = useRef(null)
  const priceInputID = `price-input-${useId()}`
  const buyingModeText = isBuyingInWeightMode ? "وزنی" : "ریالی"
  const tomanTradeValue = `${priceToToman(tradeValue)} تومن`
  const isReady = tradeValue && weight

  // Focus targeted input on mount
  useEffect(() => {
    targetInputRef.current?.focus()
  }, [])

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
        ref={targetInputRef}
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

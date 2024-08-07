import { Btn, LabeledInput, LabeledSwitch, Labeler, PriceInput } from "@/components"
import { priceToToman } from "@/utils"
import { useEffect, useId, useRef, useState } from "react"

const genReadonlyInputLabel = (text, isReadonly) =>
  isReadonly ? `${text} (غیر قابل ویرایش):` : `${text}:`

function ProductForm({ basePrice, onRefusion, modeText, unitPriceRatio, decimalNumber }) {
  const [weight, setWeight] = useState("")
  const [tradeValue, setTradeValue] = useState("")
  const [isBuyingInWeightMode, setIsBuyingWeightMode] = useState(true)
  const targetInputRef = useRef(null)
  const priceInputID = `price-input-${useId()}`
  const buyingModeText = isBuyingInWeightMode ? "وزنی" : "ریالی"
  const tomanTradeValue = `${priceToToman(tradeValue)} تومن`
  const isReady = tradeValue && weight
  const volumeMode = isBuyingInWeightMode
  const valueMode = !isBuyingInWeightMode

  // Focus targeted input on mount
  useEffect(() => targetInputRef.current?.focus(), [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(resetFormWithoutClosing, [isBuyingInWeightMode])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(handleTradeValueChange, [tradeValue])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setWeight("")
    setTradeValue("")
  }, [isBuyingInWeightMode, modeText])

  // BUG 🐞👇🏻 fixed... 😁
  const handleSubmit = e => e.preventDefault()

  function handleFormReset(e) {
    setWeight("")
    setTradeValue("")
    invoke("close form")
  }

  function handleWeightChange(e) {
    const value = Number(e.target.value)
    setWeight(value || "")
    setTradeValue(Math.round((value * basePrice) / unitPriceRatio))
  }

  function handleTradeValueChange() {
    setWeight(Number.parseFloat(((tradeValue / basePrice) * unitPriceRatio).toFixed(decimalNumber)))
  }

  function resetFormWithoutClosing() {
    setWeight("")
    setTradeValue("")
  }

  return (
    <form className="flex flex-col gap-4" onReset={handleFormReset} onSubmit={handleSubmit}>
      <LabeledSwitch
        checked={isBuyingInWeightMode}
        onChange={() => setIsBuyingWeightMode(p => !p)}
        labelText={`در حال ${modeText} در حالت ${buyingModeText}`}
      />

      <LabeledInput
        readOnly={valueMode}
        ref={targetInputRef}
        value={weight}
        onChange={handleWeightChange}
        labelTextPrimary={genReadonlyInputLabel("وزن (گرم)", valueMode)}
      />

      <Labeler
        label1={genReadonlyInputLabel("ارزش معامله (ریال)", volumeMode)}
        label2={tomanTradeValue}
        id={priceInputID}
      >
        <PriceInput
          readOnly={volumeMode}
          price={tradeValue}
          setPrice={setTradeValue}
          id={priceInputID}
        />
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

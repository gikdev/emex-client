import { Btn, LabeledInput, LabeledSwitch } from "@/components"
import { useState } from "react"

function ProductForm({ onRefusion, modeText }) {
  const [weight, setWeight] = useState("")
  const [tradeValue, setTradeValue] = useState("")
  const [isBuyingInWeightMode, setIsBuyingWeightMode] = useState(true)
  // BUG 🐞👇🏻
  // const handleSubmit = e => e.preventDefault()

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <LabeledSwitch
        checked={isBuyingInWeightMode}
        onChange={() => setIsBuyingWeightMode(p => !p)}
        labelText={`در حال ${modeText} در حالت وزنی`}
      />
      <LabeledInput
        value={weight}
        onChange={e => setWeight(e.target.value)}
        labelTextPrimary="وزن (گرم):"
      />
      <LabeledInput
        value={tradeValue}
        onChange={e => setTradeValue(e.target.value)}
        labelTextPrimary="ارزش معامله:"
        labelTextSecondary="۲۳ تومن"
      />
      <div className="flex gap-4">
        <Btn className="w-full" onClick={onRefusion}>
          انصراف
        </Btn>
        <Btn className="w-full" theme="primary" themeType="filled" type="submit">
          {modeText}
        </Btn>
      </div>
    </form>
  )
}

export { ProductForm }

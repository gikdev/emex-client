import { Btn } from "@/components"
import { cn } from "@/helpers"

function Pricy({ mode, onBtnClick, isActive = false }) {
  const isBuy = mode === "buy"
  const modeText = isBuy ? "خرید" : "فروش"

  const priceClass = cn(
    "font-black text-center text-3xl",
    isBuy ? "text-jadedark-11" : "text-reddark-11",
  )

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-center">قیمت {modeText} (ریال):</p>
      <p className={priceClass}>۳۵,۰۰۰,۰۰۰</p>
      <Btn
        themeType={isActive ? "filled" : "outline"}
        theme={isBuy ? "success" : "error"}
        onClick={onBtnClick}
      >
        {modeText}
      </Btn>
    </div>
  )
}

export { Pricy }

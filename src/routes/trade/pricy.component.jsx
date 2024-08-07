import { Btn } from "@/components"
import { cn } from "@/helpers"
import { priceToRial } from "@/utils"

function Pricy({ price = 0, mode, onBtnClick, isActive = false }) {
  const isBuy = mode === "buy"
  const modeText = isBuy ? "خرید" : "فروش"

  const priceClass = cn(
    "font-black text-center text-3xl",
    isBuy ? "text-jadedark-11" : "text-reddark-11",
  )

  return (
    <div className="flex flex-col gap-2 grow shrink">
      <p className="text-xs text-center">قیمت {modeText} (ریال):</p>
      <p className={priceClass}>{priceToRial(price)}</p>
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

import { Input } from "@/components"
import { priceToRial, rialToPrice } from "@/utils"

const allowedKeys = [
  "۰",
  "۱",
  "۲",
  "۳",
  "۴",
  "۵",
  "۶",
  "۷",
  "۸",
  "۹",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "ArrowLeft",
  "ArrowUp",
  "ArrowDown",
  "ArrowRight",
  "Delete",
  "Backspace",
  "Tab",
  "Escape",
  "Enter",
  "Control",
  "Alt",
  "Shift",
  "Meta",
  "-",
]

function PriceInput({ title, price, setPrice, ...rest }) {
  const handlePriceInput = e => setPrice(rialToPrice(e.target.value))

  function handleKeyPress(e) {
    const isPressingAllowedKey = allowedKeys.includes(e.key)
    if (!isPressingAllowedKey) e.preventDefault()
  }

  return (
    <Input
      type="text"
      dir="ltr"
      value={priceToRial(price)}
      onChange={handlePriceInput}
      onKeyDown={handleKeyPress}
      {...rest}
    />
  )
}

export { PriceInput }

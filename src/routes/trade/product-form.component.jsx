import { Btn, LabeledInput, LabeledSwitch, Labeler, PriceInput } from "@/components"
import { useSignalRContext } from "@/contexts"
import { ENUMS } from "@/enums"
import { useModal } from "@/hooks"
import { priceToToman } from "@/utils"
import { useEffect, useId, useRef, useState } from "react"
import { OrderModal, OrderModalState } from "./order-modal.component"
import { getOrderStatusByID, requestOrder } from "./product.service"

const genReadonlyInputLabel = (text, isReadonly) =>
  isReadonly ? `${text} (غیر قابل ویرایش):` : `${text}:`

function ProductForm({
  id,
  basePrice,
  onRefusion,
  modeText,
  unitPriceRatio,
  decimalNumber,
  totalBuyPrice,
  totalSellPrice,
  maxAutoMin,
  mode,
}) {
  const { connectionRef } = useSignalRContext()
  const [weight, setWeight] = useState("")
  const [tradeValue, setTradeValue] = useState("")
  const [isBuyingInWeightMode, setIsBuyingWeightMode] = useState(true)
  const [modalState, setModalState] = useState(OrderModalState.NoAnswer)
  const isAutoMode = mode !== ENUMS.AUTO_MODE.NORMAL && maxAutoMin !== 0 && maxAutoMin !== null
  const modal = useModal()
  const targetInputRef = useRef(null)
  const priceInputID = `price-input-${useId()}`
  const buyingModeText = isBuyingInWeightMode ? "وزنی" : "ریالی"
  const tomanTradeValue = `${priceToToman(tradeValue)} تومن`
  const isReady = tradeValue && weight
  const isVolumeMode = isBuyingInWeightMode
  const isValueMode = !isBuyingInWeightMode

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

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      tyStockID: id,
      side: modeText === "خرید" ? ENUMS.ORDER_SIDE.BUY : ENUMS.ORDER_SIDE.SELL,
      mode: isValueMode ? ENUMS.PRODUCT_PURCHASE_MODE.VALUE : ENUMS.PRODUCT_PURCHASE_MODE.VOLUME,
      price: modeText === "خرید" ? totalBuyPrice : totalSellPrice,
      volume: +Number.parseFloat(Number(weight).toFixed(decimalNumber)),
      value: Number(tradeValue),
    }

    requestOrder(data, orderData => {
      connectionRef.current.invoke("RequestOrder", orderData.id)
      connectionRef.current.on("Decided", onDecided)

      function onDecided(isAccepted, orderID) {
        if (orderData.id !== orderID) return

        setModalState(isAccepted ? OrderModalState.Agreed : OrderModalState.Disagreed)
      }

      if (!isAutoMode) {
        modal.openModal()
        return
      }

      setModalState(OrderModalState.Waiting)
      modal.openModal()

      async function onTimerEnd() {
        const data = await getOrderStatusByID(orderData.id, () => {
          setModalState(OrderModalState.Error)
        })

        const isAccepted = data.orderStatus === ENUMS.ORDER_STATUS.ACCEPTED
        const isRejected = data.orderStatus === ENUMS.ORDER_STATUS.REJECTED

        connectionRef.current.invoke("UpdateOrder", data.id)

        if (isAccepted) setModalState(OrderModalState.Agreed)
        else if (isRejected) setModalState(OrderModalState.Disagreed)
        else setModalState(OrderModalState.NoAnswer)
      }

      setTimeout(onTimerEnd, maxAutoMin * 60 * 1000)
    })
  }

  return (
    <>
      <OrderModal modal={modal} state={modalState} seconds={maxAutoMin * 60} />

      <form className="flex flex-col gap-4" onReset={handleFormReset} onSubmit={handleSubmit}>
        <LabeledSwitch
          checked={isBuyingInWeightMode}
          onChange={() => setIsBuyingWeightMode(p => !p)}
          labelText={`در حال ${modeText} در حالت ${buyingModeText}`}
        />

        <LabeledInput
          readOnly={isValueMode}
          ref={targetInputRef}
          value={weight}
          onChange={handleWeightChange}
          labelTextPrimary={genReadonlyInputLabel("وزن (گرم)", isValueMode)}
        />

        <Labeler
          label1={genReadonlyInputLabel("ارزش معامله (ریال)", isVolumeMode)}
          label2={tomanTradeValue}
          id={priceInputID}
        >
          <PriceInput
            readOnly={isVolumeMode}
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
    </>
  )
}

export { ProductForm }

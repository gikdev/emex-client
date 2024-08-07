import { Btn } from "@/components"
import { Upload } from "@phosphor-icons/react"
import { forwardRef, useId } from "react"

function LabeledUploadInputComponent({ labelText, secondLabel }, ref) {
  const idToUse = useId()
  const id = `labeled-upload-input-${idToUse}`

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex justify-between items-center">
        <span>{labelText}</span>
        {secondLabel}
      </label>
      <Btn as="label" htmlFor={id} className="h-12 cursor-pointer" icon={Upload}>
        آپلود فایل
      </Btn>
      <input type="file" id={id} className="hidden" ref={ref} />
    </div>
  )
}

const LabeledUploadInput = forwardRef(LabeledUploadInputComponent)

export { LabeledUploadInput }

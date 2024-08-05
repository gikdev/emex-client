import { Btn } from "@/components"
import { Upload } from "@phosphor-icons/react"
import { useId } from "react"

function LabeledUploadInput({ labelText, secondLabel }) {
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
      <input type="file" id={id} className="hidden" />
    </div>
  )
}

export { LabeledUploadInput }

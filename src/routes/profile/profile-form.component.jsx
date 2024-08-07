import { Btn, LabeledInput, LabeledTextarea } from "@/components"
import { FloppyDiskBack, UserCircle } from "@phosphor-icons/react"
import { useForm } from "react-hook-form"
import tw from "tailwind-styled-components"
import { LabeledUploadInput } from "./labeled-upload-input.component"

const StyledForm = tw.form`grid sm:grid-cols-2 gap-y-6 gap-x-4 items-end`

function ProfileForm() {
  const { register, handleSubmit } = useForm()
  const name = register("name", {})
  const city = register("city", {})
  const codeMelli = register("codeMelli", {})
  const kasbID = register("kasbID", {})
  const melliID = register("melliID", {})
  const address = register("address", {})

  function onSubmit(data) {
    console.log(data)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <LabeledInput {...name} dir="rtl" type="text" labelTextPrimary="نام:" />
      <LabeledInput disabled labelTextPrimary="موبایل:" />
      <LabeledInput {...city} dir="rtl" type="text" labelTextPrimary="شهر:" />
      <LabeledInput {...codeMelli} type="number" labelTextPrimary="کدملی:" />
      <LabeledUploadInput {...kasbID} labelText="آیدی کسب:" secondLabel="ندارد" />
      <LabeledUploadInput {...melliID} labelText="آیدی ملی:" secondLabel="ندارد" />
      <LabeledTextarea {...address} dir="rtl" labelTextPrimary="آدرس:" />
      <div className="flex flex-col gap-4">
        <Btn type="submit" themeType="filled" theme="primary" icon={FloppyDiskBack}>
          دخیره
        </Btn>
        <Btn type="button" icon={UserCircle}>
          خروج از حساب
        </Btn>
      </div>
    </StyledForm>
  )
}

export { ProfileForm }

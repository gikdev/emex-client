import { Btn, Heading, Hr, LabeledInput, LabeledTextarea } from "@/components"
import { FloppyDiskBack, UserCircle } from "@phosphor-icons/react"
import tw from "tailwind-styled-components"
import { Link } from "wouter"
import { LabeledUploadInput } from "./labeled-upload-input.component"

const StyledContainer = tw.form`
  bg-slatedark-2 border-2 border-slatedark-6 w-full
  p-4 flex flex-col gap-4 text-center rounded-lg max-w-[40rem]
`
const StyledInputsWrapper = tw.div`grid sm:grid-cols-2 gap-y-6 gap-x-4 items-end`

function ProfileCard() {
  return (
    <StyledContainer>
      <Heading as="h2" size={2}>
        تنظیمات پروفایل
      </Heading>
      <Hr />
      <StyledInputsWrapper>
        <LabeledInput dir="rtl" type="text" labelTextPrimary="نام:" />
        <LabeledInput disabled labelTextPrimary="موبایل:" />
        <LabeledInput dir="rtl" type="text" labelTextPrimary="شهر:" />
        <LabeledInput type="number" labelTextPrimary="کدملی:" />
        <LabeledUploadInput labelText="آیدی کسب:" secondLabel="ندارد" />
        <LabeledUploadInput labelText="آیدی ملی:" secondLabel="ندارد" />
        <LabeledTextarea dir="rtl" labelTextPrimary="آدرس:" />
        <div className="flex flex-col gap-4">
          <Btn type="submit" themeType="filled" theme="primary" icon={FloppyDiskBack}>
            دخیره
          </Btn>
          <Btn type="button" icon={UserCircle}>
            خروج از حساب
          </Btn>
        </div>
      </StyledInputsWrapper>
    </StyledContainer>
  )
}

export { ProfileCard }

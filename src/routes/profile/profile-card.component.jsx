import { Heading, Hr } from "@/components"
import tw from "tailwind-styled-components"
import { ProfileForm } from "./profile-form.component"

const StyledContainer = tw.div`
  bg-slatedark-2 border-2 border-slatedark-6 w-full
  p-4 flex flex-col gap-4 text-center rounded-lg max-w-[40rem]
`

function ProfileCard() {
  return (
    <StyledContainer>
      <Heading as="h2" size={2}>
        تنظیمات پروفایل
      </Heading>
      <Hr />
      <ProfileForm />
    </StyledContainer>
  )
}

export { ProfileCard }

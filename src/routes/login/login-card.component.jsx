import { Btn, Heading, Hr, LabeledInput } from "@/components"
import tw from "tailwind-styled-components"

const StyledContainer = tw.form`
  bg-slatedark-2 border-2 border-slatedark-6 w-full
  p-4 flex flex-col gap-4 text-center rounded-lg max-w-96
`

const handleSubmit = e => {
  e.preventDefault()

  console.log(e)
}

function LoginCard() {
  return (
    <StyledContainer onSubmit={handleSubmit}>
      <Heading as="h2" size={2}>
        ورود
      </Heading>
      <Hr />
      <LabeledInput type="number" labelTextPrimary="شماره تلفن:" />
      <LabeledInput type="password" labelTextPrimary="رمز:" />
      <Btn type="submit" themeType="filled" theme="primary">
        ورود
      </Btn>
    </StyledContainer>
  )
}

export { LoginCard }

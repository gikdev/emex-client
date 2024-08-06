import { Btn, Heading, Hr, LabeledInput, PError } from "@/components"
import { useLoading } from "@/hooks"
import { useForm } from "react-hook-form"
import tw from "tailwind-styled-components"
import { useLocation } from "wouter"
import { loginUser } from "./login-user.service"

const StyledContainer = tw.form`
  bg-slatedark-2 border-2 border-slatedark-6 w-full
  p-4 flex flex-col gap-4 text-center rounded-lg max-w-96
`

function LoginCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [isLoading, startLoading, endLoading] = useLoading(false)
  const [, navigate] = useLocation()

  const onSubmit = data => {
    startLoading()
    loginUser(data, endLoading, navigate)
  }

  return (
    <StyledContainer onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2" size={2}>
        ورود
      </Heading>
      <Hr />
      <LabeledInput
        {...register("phone", { required: "شماره تلفن الزامی هست" })}
        type="number"
        labelTextPrimary="شماره تلفن:"
      />
      {errors.phone && <PError>{errors.phone.message}</PError>}
      <LabeledInput
        {...register("password", { required: "رمز ورود الزامی هست" })}
        type="password"
        labelTextPrimary="رمز:"
      />
      {errors.password && <PError>{errors.password.message}</PError>}
      <Btn isLoading={isLoading} type="submit" themeType="filled" theme="primary">
        ورود
      </Btn>
    </StyledContainer>
  )
}

export { LoginCard }

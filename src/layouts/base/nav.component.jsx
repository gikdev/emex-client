import avatarPlaceholder from "@/assets/avatar-placeholder.png"
import logoFull from "@/assets/logo-full.png"
import { Badge } from "@/components"
import tw from "tailwind-styled-components"
import { Link } from "wouter"

const StyledNav = tw.nav`flex items-center justify-between border-b border-slatedark-6 p-4`
const StyledAdminChip = tw(Link)`flex gap-2 items-center justify-center`

function Nav() {
  return (
    <StyledNav>
      <Link href="/">
        <img src={logoFull} alt="" />
      </Link>
      <StyledAdminChip href="/not-found">
        <Badge theme="success">آنلاین</Badge>
        <p>فروشگاه علی بقال</p>
        <img src={avatarPlaceholder} alt="" />
      </StyledAdminChip>
    </StyledNav>
  )
}

export { Nav }

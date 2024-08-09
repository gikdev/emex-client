import logoFull from "@/assets/logo-full.png"
import { Badge } from "@/components"
import { useAdminContext } from "@/contexts"
import tw from "tailwind-styled-components"
import { Link } from "wouter"
import { ConnectionIndicator } from "./connection-indicator.component"

const StyledNav = tw.nav`flex items-center justify-between border-b border-slatedark-6 p-4`
const StyledAdminChip = tw(Link)`flex gap-2 items-center justify-center`

function Nav() {
  const adminStatus = useAdminContext()

  return (
    <StyledNav>
      <Link href="/">
        <img src={logoFull} alt="" />
      </Link>
      <StyledAdminChip href="/">
        <ConnectionIndicator />
        {adminStatus.isOnline ? <Badge theme="success">آنلاین</Badge> : <Badge>آفلاین</Badge>}
        <p>{adminStatus.shopName}</p>
        <img src={adminStatus.logoUrl} alt="" />
      </StyledAdminChip>
    </StyledNav>
  )
}

export { Nav }

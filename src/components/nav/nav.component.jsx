import logoFull from "@/assets/logo-full.png"
import { Badge, Btn } from "@/components"
import { useAdminContext, useUIContext } from "@/contexts"
import { cn } from "@/helpers"
import { List } from "@phosphor-icons/react"
import tw from "tailwind-styled-components"
import { Link } from "wouter"
import { ConnectionIndicator } from "./connection-indicator.component"

const StyledNav = tw.nav`flex items-center justify-between border-b border-slatedark-6 p-4`
const StyledAdminChip = tw(Link)`flex gap-2 items-center justify-center`

function Nav() {
  const adminStatus = useAdminContext()
  const { sidebar } = useUIContext()

  const profileWrapperClasses = cn("size-10 rounded-full relative", {
    "md:after:hidden after:size-4 after:rounded-full after:bg-jadedark-11 after:border-[3px] after:border-jadedark-3 after:top-0 after:start-0 after:absolute after:inline-block":
      adminStatus.isOnline,
  })

  return (
    <StyledNav>
      <Link className="hidden md:inline-block" href="/">
        <img src={logoFull} alt="" />
      </Link>
      <Btn className="w-10 p-0 flex md:hidden" onClick={sidebar.open} icon={List} />
      <StyledAdminChip href="/">
        <ConnectionIndicator />
        <Badge
          className="hidden md:inline-block"
          theme={adminStatus.isOnline ? "success" : "neutral"}
        >
          {adminStatus.isOnline ? "آنلاین" : "آفلاین"}
        </Badge>
        <p className="text-sm">{adminStatus.shopName}</p>
        <div className={profileWrapperClasses}>
          <img src={adminStatus.logoUrl} alt="" />
        </div>
      </StyledAdminChip>
    </StyledNav>
  )
}

export { Nav }

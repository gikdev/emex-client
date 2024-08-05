import { Btn } from "@/components"
import {
  Coins,
  House,
  Info,
  PenNib,
  Receipt,
  Scales,
  Storefront,
  UserCircle,
  XCircle,
} from "@phosphor-icons/react"
import tw from "tailwind-styled-components"
import { Link, useLocation } from "wouter"

const items = [
  { id: 0, text: "خانه", icon: House, url: "/" },
  { id: 1, text: "پروفایل", icon: UserCircle, url: "/profile" },
  { id: 2, text: "معاملات", icon: Storefront, url: "/trade" },
  { id: 3, text: "مشاهده سفارشات", icon: Receipt, url: "#" },
  { id: 4, text: "ثبت سند", icon: PenNib, url: "#" },
  { id: 5, text: "ثبت حواله", icon: PenNib, url: "#" },
  { id: 6, text: "شرایط و قوانین", icon: Scales, url: "/rules" },
  { id: 7, text: "مانده حساب", icon: Coins, url: "#" },
  { id: 8, text: "درباره ما", icon: Info, url: "/about" },
]

const StyledAside = tw.aside`
  border-l border-slatedark-6 
  flex flex-col p-4 gap-2 max-w-max
`

function Sidebar() {
  return (
    <StyledAside>
      {items.map(item => (
        <SidebarItem key={item.id} {...item} />
      ))}
      <Btn className="mt-auto md:hidden" icon={XCircle}>
        {" "}
        بستن{" "}
      </Btn>
    </StyledAside>
  )
}

const StyledSidebarItem = tw(Link)`
  min-w-52 flex gap-2 py-3 px-4 rounded-lg items-center
  hover:bg-slatedark-3 hover:text-slatedark-12 active:scale-95 transition-all
`

function SidebarItem({ text = "آیتم سایدبار", icon: Icon = House, url }) {
  const [path] = useLocation()
  const isActive = path === url

  return (
    <StyledSidebarItem
      href={url}
      className={
        isActive ? "bg-amberdark-9 text-slatedark-1 hover:text-slatedark-12 hover:bg-amber-8" : ""
      }
    >
      <Icon weight={isActive ? "fill" : "regular"} size={24} />
      <span>{text}</span>
    </StyledSidebarItem>
  )
}

export { Sidebar }

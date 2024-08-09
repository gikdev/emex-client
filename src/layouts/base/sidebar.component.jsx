import logoFull from "@/assets/logo-full.png"
import { Btn } from "@/components"
import { useUIContext } from "@/contexts"
import { cn } from "@/helpers"
import {
  Code,
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

const isDev = import.meta.env.DEV

const items = [
  { id: 0, text: "خانه", icon: House, url: "/" },
  // { id: 1, text: "پروفایل", icon: UserCircle, url: "/profile" },
  { id: 2, text: "معاملات", icon: Storefront, url: "/trade" },
  { id: 3, text: "مشاهده سفارشات", icon: Receipt, url: "/orders" },
  // { id: 4, text: "ثبت سند", icon: PenNib, url: "#" },
  // { id: 5, text: "ثبت حواله", icon: PenNib, url: "#" },
  { id: 6, text: "شرایط و قوانین", icon: Scales, url: "/rules" },
  { id: 7, text: "مانده حساب", icon: Coins, url: "/remainings" },
  { id: 8, text: "درباره ما", icon: Info, url: "/about" },
]

if (isDev) items.push({ id: 9, text: "تست", icon: Code, url: "/test" })

function Sidebar() {
  const { sidebar } = useUIContext()

  const asideClasses = cn(
    "border-l border-slatedark-6 bg-slatedark-1 z-10",
    "flex flex-col p-4 gap-2",
    "inset-0 w-full max-w-full",
    "md:relative md:max-w-max md:flex",
    {
      hidden: !sidebar.isOpen,
      fixed: sidebar.isOpen,
    },
  )

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <aside className={asideClasses} onClick={sidebar.close}>
      <img className="inline-block md:hidden max-w-max mxauto" src={logoFull} alt="" />
      {items.map(item => (
        <SidebarItem key={item.id} {...item} />
      ))}
      <Btn onClick={sidebar.close} className="mt-auto md:hidden" icon={XCircle}>
        {" "}
        بستن{" "}
      </Btn>
    </aside>
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

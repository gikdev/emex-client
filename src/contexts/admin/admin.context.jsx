import avatarPlaceholder from "@/assets/avatar-placeholder.png"
import { useSignalRContext } from "@/contexts"
import { ENUMS } from "@/enums"
import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"
import { useGetMasterInfo } from "./use-get-master-info.hook"

const AdminContext = createContext({
  logoUrl: avatarPlaceholder,
  shopName: "",
  isOnline: false,
  adminStatus: 5,
})

const useAdminContext = () => useContext(AdminContext)

function AdminProvider({ children }) {
  const [isOnline, setIsOnline] = useState(false)
  const [adminStatus, setAdminStatus] = useState(false)
  const { connectionRef } = useSignalRContext()
  const [logoUrl, shopName, adminStatusData] = useGetMasterInfo(["logoUrl", "name", "status"])
  const value = { isOnline, logoUrl, shopName, adminStatus }

  useEffect(() => {
    if (!adminStatusData) return

    const _isOnline = adminStatusData === ENUMS.ADMIN_STATUS.ONLINE
    setIsOnline(_isOnline)
    setAdminStatus(adminStatusData)
  }, [adminStatusData])

  useEffect(() => {
    if (!connectionRef.current) return

    connectionRef.current.on("MasterStatusChange", (masterID, _isOnline) => {
      if (+Cookies.get("masterID") !== masterID) return
      setAdminStatus(_isOnline ? ENUMS.ADMIN_STATUS.ONLINE : ENUMS.ADMIN_STATUS.OFFLINE)
      setIsOnline(_isOnline)
    })
  }, [connectionRef.current])

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export { AdminContext, AdminProvider, useAdminContext }

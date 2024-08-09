import { version } from "@/assets/data.json"
import { VersionTag } from "@/components"
import { Toaster } from "react-hot-toast"
import { AdminProvider, SignalRProvider } from "./contexts"

function Providers({ children }) {
  return (
    <>
      <Toaster toastOptions={{ position: "bottom-left" }} />
      <SignalRProvider>
        <AdminProvider>{children}</AdminProvider>
      </SignalRProvider>
      <VersionTag version={version} />
    </>
  )
}

export { Providers }

import { version } from "@/assets/data.json"
import { VersionTag } from "@/components"
import { Toaster } from "react-hot-toast"
import { SignalRProvider } from "./contexts"

function Providers({ children }) {
  return (
    <>
      <Toaster toastOptions={{ position: "bottom-left" }} />
      <SignalRProvider>{children}</SignalRProvider>
      <VersionTag version={version} />
    </>
  )
}

export { Providers }

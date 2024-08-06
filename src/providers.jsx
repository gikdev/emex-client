import { version } from "@/assets/data.json"
import { VersionTag } from "@/components"
import { Toaster } from "react-hot-toast"

function Providers({ children }) {
  return (
    <>
      <Toaster toastOptions={{ position: "bottom-left" }} />
      {children}
      <VersionTag version={version} />
    </>
  )
}

export { Providers }

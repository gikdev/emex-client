import { AdminProvider, UIProvider } from "@/contexts"

function Providers({ children }) {
  return (
    <AdminProvider>
      <UIProvider>{children}</UIProvider>
    </AdminProvider>
  )
}

export { Providers }

import { ErrorCard, Nav } from "@/components"
import { AdminProvider } from "@/contexts"
import { useSmartLoginManager } from "@/hooks"
import { ErrorBoundary } from "react-error-boundary"
import { Sidebar } from "./sidebar.component"

function Base({ children }) {
  useSmartLoginManager()

  return (
    <AdminProvider>
      <header>
        <Nav />
      </header>
      <main className="flex grow">
        <Sidebar />
        <section className="grow">
          <ErrorBoundary FallbackComponent={ErrorCard}>{children}</ErrorBoundary>
        </section>
      </main>
    </AdminProvider>
  )
}

export { Base }

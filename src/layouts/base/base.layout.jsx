import { ErrorCard } from "@/components"
import { useSmartLoginManager } from "@/hooks"
import { ErrorBoundary } from "react-error-boundary"
import { Nav } from "./nav.component"
import { Sidebar } from "./sidebar.component"

function Base({ children }) {
  useSmartLoginManager()

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="flex grow">
        <Sidebar />
        <section className="grow">
          <ErrorBoundary FallbackComponent={ErrorCard}>{children}</ErrorBoundary>
        </section>
      </main>
    </>
  )
}

export { Base }

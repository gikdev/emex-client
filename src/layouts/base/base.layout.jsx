import { ErrorCard, Nav } from "@/components"
import { useSmartLoginManager } from "@/hooks"
import { ErrorBoundary } from "react-error-boundary"
import { Providers } from "./providers"
import { Sidebar } from "./sidebar.component"

function Base({ children }) {
  useSmartLoginManager()

  return (
    <Providers>
      <header>
        <Nav />
      </header>
      <main className="flex grow shrink">
        <Sidebar />
        <section className="grow shrink">
          <ErrorBoundary FallbackComponent={ErrorCard}>{children}</ErrorBoundary>
        </section>
      </main>
    </Providers>
  )
}

export { Base }

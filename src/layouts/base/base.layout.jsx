import data from "@/assets/data.json"
import { ErrorCard, VersionTag } from "@/components"
import { ErrorBoundary } from "react-error-boundary"
import { Nav } from "./nav.component"
import { Sidebar } from "./sidebar.component"

function Base({ children }) {
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
      <VersionTag version={data.version} />
    </>
  )
}

export { Base }

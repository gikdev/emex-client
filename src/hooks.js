import { useCallback, useState } from "react"

function useLoading(initialValue = false) {
  const [isLoading, setIsLoading] = useState(initialValue)

  const startLoading = useCallback(() => {
    setIsLoading(true)
  })

  const endLoading = useCallback(() => {
    setIsLoading(false)
  })

  return [isLoading, startLoading, endLoading, setIsLoading]
}

export { useLoading }
export * from "emex-shared/hooks"

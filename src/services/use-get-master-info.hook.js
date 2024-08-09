import { apiEndpoints, apiHelper, fetcher } from "@/helpers"
import useSWR from "swr"

function useGetMasterInfo(input) {
  const config = apiEndpoints.customer.getMaster
  const fetcherConfig = { headers: apiHelper.header.bearer }
  const response = useSWR(config.url, fetcher(fetcherConfig))

  const wantsWholeResult = typeof input === "boolean" && input
  const wantsAKey = typeof input === "string"
  const wantsKeys = Array.isArray(input)

  if (wantsWholeResult) return response
  if (wantsAKey) return input && response.data ? response.data.result[input] : ""
  if (wantsKeys) {
    const toReturn = []

    if (!response.data) return toReturn

    input.map(key => toReturn.push(response.data.result[key]))

    return toReturn
  }
}

export { useGetMasterInfo }

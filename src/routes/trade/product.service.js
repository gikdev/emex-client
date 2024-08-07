import { MESSAGES } from "@/constants"
import { apiEndpoints, apiHelper } from "@/helpers"
import toast from "react-hot-toast"

function requestOrder(data, onSuccessCallback) {
  const config = apiEndpoints.customer.requestOrder

  fetch(config.url, {
    method: config.method,
    headers: apiHelper.header.jsonAndBearer,
    body: JSON.stringify(data),
  })
    .then(res => {
      if (!res.ok) throw new Error()

      toast.success(MESSAGES.SUCCESS_DESCRIPTION)
      return res.json()
    })
    .then(onSuccessCallback)
    .catch(err => {
      toast.error(MESSAGES.ERROR_DEFAULT_DESCRIPTION)
    })
}

export { requestOrder }

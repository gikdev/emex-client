import { MESSAGES } from "@/constants"
import { apiEndpoints, apiHelper } from "@/helpers"
import Cookies from "js-cookie"
import { sha512 } from "js-sha512"
import toast from "react-hot-toast"

function loginUser(data, endLoading, navigate) {
  const conf = apiEndpoints.customer.login

  fetch(conf.url, {
    method: conf.method,
    headers: apiHelper.header.json,
    body: JSON.stringify({
      un: data.phone,
      pw: sha512(data.password),
    }),
  })
    .then(res => {
      if (!res.ok) throw res

      toast.success(MESSAGES.LOGIN_SUCCESSFUL)
      return res.json()
    })
    .then(data => {
      for (const key in data) Cookies.set(key, data[key])

      location.href = "/trade"
    })
    .catch(() => {
      toast.error(MESSAGES.ERROR_DEFAULT_DESCRIPTION)
    })
    .finally(() => endLoading())
}

export { loginUser }

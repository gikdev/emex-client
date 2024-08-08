import { persianifyNumber } from "@/utils"

function persianizeSeconds(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  const formattedHours = persianifyNumber(h.toString().padStart(2, "0"))
  const formattedMinutes = persianifyNumber(m.toString().padStart(2, "0"))
  const formattedSeconds = persianifyNumber(s.toString().padStart(2, "0"))

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

export { persianizeSeconds }

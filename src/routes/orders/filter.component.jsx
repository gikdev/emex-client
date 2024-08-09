import { useEffect } from "react"
import { DatePicker } from "zaman"

function Filter({ fromDate, setFromDate, toDate, setToDate, mutate }) {
  function handleFiltering(e) {
    setFromDate(new Date(e.from))
    setToDate(new Date(e.to))
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    mutate()
  }, [fromDate, toDate])

  return (
    <div className="flex items-center gap-2 flex-col sm:flex-row mb-3">
      <p className="w-max shrink-0">فیلتر بر اساس تاریخ:</p>
      <DatePicker
        from={fromDate}
        to={toDate}
        inputClass="w-full grow shrink text-center px-4 py-3 bg-slatedark-3 border border-slatedark-6 rounded text-slatedark-11 w-full
  focus:border-transparent focus:bg-slatedark-5 focus:text-slatedark-12"
        onChange={handleFiltering}
        range
      />
    </div>
  )
}

export { Filter }

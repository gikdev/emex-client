import "@/styles/main.css"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import "@/styles/overrides.css"
import { Routes } from "@/routes/index"
import React from "react"
import ReactDOM from "react-dom/client"

const container = document.querySelector("#root")
const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)

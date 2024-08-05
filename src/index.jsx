import "./styles.css"
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

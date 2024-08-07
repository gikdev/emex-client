import { apiHelper } from "@/helpers"
import * as signalR from "@microsoft/signalr"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"

const SignalRContext = createContext()

const useSignalRContext = () => useContext(SignalRContext)

const isDev = import.meta.env.DEV
const OK_CONNECTION_STATES = ["connected", "loading"]

function SignalRProvider({ children }) {
  // Available states: "disconnected" | "connected" | "uknown"
  const [connectionState, setConnectionState] = useState()
  const connectionRef = useRef(null)

  const value = { connectionRef, connectionState }

  const handleClose = useCallback(() => setConnectionState("disconnected"), [])
  const handleReconnected = useCallback(() => setConnectionState("connected"), [])
  const handleStarted = useCallback(() => setConnectionState("connected"), [])
  const handleConnectionFailed = useCallback(() => setConnectionState("disconnected"), [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .configureLogging(isDev ? signalR.LogLevel.Information : signalR.LogLevel.Error)
      .withUrl(`${apiHelper.BASE_URL}/priceHub`)
      .build()
    newConnection.onreconnected(handleReconnected)
    newConnection.onclose(handleClose)
    newConnection.start().then(handleStarted).catch(handleConnectionFailed)
    connectionRef.current = newConnection

    const cleanup = () => connectionRef.current?.stop()

    return cleanup
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const interval = setInterval(() => {
      const isOKState = OK_CONNECTION_STATES.includes(connectionState)
      if (isOKState) return

      connectionRef.current?.start().then(handleStarted).catch(handleConnectionFailed)
    }, 3000)

    const cleanup = () => clearInterval(interval)

    return cleanup
  }, [connectionState])

  return <SignalRContext.Provider value={value}>{children}</SignalRContext.Provider>
}

export { SignalRProvider, useSignalRContext }

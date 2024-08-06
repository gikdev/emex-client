import { apiHelper } from "@/helpers"
import * as signalR from "@microsoft/signalr"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"

const SignalRContext = createContext()

const useSignalRContext = () => useContext(SignalRContext)

function SignalRProvider({ children }) {
  // Available states: "disconnected" | "connected" | "loading" | "uknown"
  const [connectionState, setConnectionState] = useState()
  const connectionRef = useRef(null)

  const value = { connectionRef, connectionState }

  const handleClose = useCallback(() => setConnectionState("disconnected"), [])
  const handleReconnecting = useCallback(() => setConnectionState("loading"), [])
  const handleReconnected = useCallback(() => setConnectionState("connected"), [])
  const handleStarted = useCallback(() => setConnectionState("connected"), [])
  const handleConnectionFailed = useCallback(() => setConnectionState("disconnected"), [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiHelper.BASE_URL}/priceHub`)
      .build()
    newConnection.onreconnecting(handleReconnecting)
    newConnection.onreconnected(handleReconnected)
    newConnection.onclose(handleClose)
    newConnection.start().then(handleStarted).catch(handleConnectionFailed)

    function cleanup() {
      connectionRef.current?.stop()
    }

    return cleanup
  }, [])

  return <SignalRContext.Provider value={value}>{children}</SignalRContext.Provider>
}

export { SignalRProvider, useSignalRContext }

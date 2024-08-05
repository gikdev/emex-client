import { Base } from "@/layouts"
import { Route, Switch } from "wouter"
import { Home } from "./home/home.route"
import { Login } from "./login/login.route"
import { Profile } from "./profile/profile.route"
import { Trade } from "./trade/trade.route"

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Base>
        <Route path="/" component={Home} />
        <Route path="/trade" component={Trade} />
        <Route path="/profile" component={Profile} />
      </Base>
    </Switch>
  )
}

export { Routes }

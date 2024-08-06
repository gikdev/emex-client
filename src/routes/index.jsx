import { Base } from "@/layouts"
import { Route, Switch } from "wouter"
import { About } from "./about/about.route"
import { Home } from "./home/home.route"
import { Login } from "./login/login.route"
import { Profile } from "./profile/profile.route"
import { Rules } from "./rules/rules.route"
import { Test } from "./test.route"
import { Trade } from "./trade/trade.route"

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Base>
        <Route path="/" component={Home} />
        <Route path="/trade" component={Trade} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/rules" component={Rules} />
        <Route path="/test" component={Test} />
        <Route> ۴۰۴ پیدا نشد </Route>
      </Base>
    </Switch>
  )
}

export { Routes }

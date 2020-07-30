import React from "react"
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Component } from "react"
import Home from "../pages/users/index"
import Login from "../pages/users/Login"
import notFind from "../pages/Notfind"
console.log(Home)
class App extends Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route component={notFind}></Route>
                </Switch>
            </Router>
        )
    }
}

export default App
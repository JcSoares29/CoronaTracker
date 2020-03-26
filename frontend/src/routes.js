import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Cases from './pages/Cases'
import Initial from './pages/Initial'

//                 <Route path="/" exact component={Initial}/>

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/cases" exact component={Cases}/>
            </Switch>
        </BrowserRouter>
    )
}
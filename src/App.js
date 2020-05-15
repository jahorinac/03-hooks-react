import React, { Component } from 'react'
import { BrowserRouter, Switch, Route }from 'react-router-dom'
import Dashboard from './components/Boards/Dashboard'
import AddNewTask from "./components/Modal/AddNewTask"
import AppContext from './AppContext'
import Navbar from './components/Navbar'
import SideMenu from './components/SideMenu'
import EditTask from './components/EditTask/EditTask'

class App extends Component{

    state = {
        cardStatuses: [],
        cards:[]
    };

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/jahorinac/data/master/03-tasks.json')
            .then(response =>{
                return response.json()
            })
            .then(data => {
                this.setState({...data[0]})
            })
    }

    updateAppState = value => {
        this.setState({
            ...value
        })
    };

    render(){
        return (
            <BrowserRouter>
                <div className="app d-flex flex-column">
                    <Navbar/>
                    <div className="d-flex flex-grow-1">
                        <SideMenu/>
                        <Switch>
                            <AppContext.Provider value="dafault string from provider">
                                <Route exact path='/' render={(routeProps) => (<Dashboard {...routeProps} passData={ this.state } updateApp={ this.updateAppState }/> )}
                                />
                                <Route path='/new-task'
                                       render={(routeProps) => (<AddNewTask {...routeProps} passData={ this.state } updateApp={ this.updateAppState } />)}
                                />
                                <Route path='/edit/:id'>
                                    <EditTask passData={this.state} updateApp={ this.updateAppState }/>
                                </Route>
                            </AppContext.Provider>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;

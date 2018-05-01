
import React, { Component } from 'react'
import EventsList from './components/component_events_list'
import OptionsList from './components/component_options_list'
import './index.css'
import 'materialize-css/dist/css/materialize.min.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers/'

const store = createStore(reducers)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="app">
					<OptionsList />
					<EventsList />
				</div>
			</Provider>
		)
	}
}


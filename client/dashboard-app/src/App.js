
import React, { Component } from 'react'
import EventsList from './components/component_events_list'
import OptionsList from './components/component_options_list'
import './index.css'
// import 'materialize-css'; 
import 'materialize-css/dist/css/materialize.min.css';

export default class App extends Component {
	render() {
		return (
			<div className="APP">

				<OptionsList />
				<EventsList />

			</div>
		)
	}
}


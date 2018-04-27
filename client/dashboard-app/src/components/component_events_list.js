


import React, { Component } from 'react'
import eventsData from '../assets/eventsData.json'
import EventDetail from './component_event_detail'

class EventsList extends Component {


	renderEventsList() {	
		return eventsData.map(event => {
			return (
				<EventDetail
					key={event.event_id} 
					event={event}
				/>
			)
		})
	}

	render() {
		return (
			<div>
				{this.renderEventsList()}
			</div>
		)
	}
}

export default EventsList

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
					customStyle=""
				/>
			)
		})
	}
	
	render() {
		return (
			<div className="events-dashboard">
				<ul className="events-list">
					{this.renderEventsList()}
				</ul>
			</div>
		)
	}
}

export default EventsList

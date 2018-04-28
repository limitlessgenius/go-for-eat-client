


import React, { Component } from 'react'

import { Tabs, Tab } from 'react-materialize'

class OptionsList extends Component {
	render() {
		return (
			<div className="options-dashboard">
				<Tabs className="options-list tabs">
					<Tab title="ALL" />
					<Tab title="PAST" />
					<Tab title="TODAY" />
					<Tab title="FUTURE" />
				</Tabs>
			</div>

		)
	}
}

export default OptionsList

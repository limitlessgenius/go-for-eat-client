


import React, { Component } from 'react'

import { Tabs, Tab } from 'react-materialize'

class OptionsList extends Component {

	render() {
		return (
			<div className="options-dashboard">
				<Tabs className="options-list tabs">
					<Tab className="option-tab"active title="ALL" />
					<Tab className="option-tab"title="PAST" />
					<Tab className="option-tab"title="TODAY" />
					<Tab className="option-tab"title="FUTURE" />
				</Tabs>
			</div>

		)
	}
}

export default OptionsList

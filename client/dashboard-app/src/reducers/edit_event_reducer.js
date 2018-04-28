

export default (state = null, action) => {

	switch(action.type){
		case 'EDIT_EVENT': 
			return 'EVENT EDITED'
		default: 
			return state
	}
}








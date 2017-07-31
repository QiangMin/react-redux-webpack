import  React from 'react'
import {Link} from 'react-router'
import {render,unmountComponentAtNode} from 'react-dom'
import {connect} from 'react-redux'

class Togglable2 extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount() {
		
	}
	componentWillMount() {
		
	}
	render(){
		return(
				<div className="lists">
					world
				</div>
			)
	}

}
let mapStateToProps=(state,ownProps)=>{

	return {
		language:state.changeLanguage
	}
}
export default connect(mapStateToProps)(Togglable2);
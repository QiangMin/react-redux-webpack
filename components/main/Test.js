import  React from 'react'
import {Link} from 'react-router'
import {render,unmountComponentAtNode} from 'react-dom'
import {connect} from 'react-redux'

class Test extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount() {
		
	}
	componentWillMount() {
		
	}
	render(){
		let {i18nObj:i18n}=this.props.language;

		return(
			<div className="content_right">
				<div className="head">{i18n[3]}</div>
				<div className="lists">测试页面</div>
			</div>)
	}

}
let mapStateToProps=(state,ownProps)=>{

	return {
		language:state.changeLanguage
	}
}
export default connect(mapStateToProps)(Test);
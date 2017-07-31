import  React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import PropTypes from 'prop-types'


class Header extends React.Component{
	constructor(props) {
		super(props);
		
		
	}
	changeLanguage(language){
		this.props.changeLanguage(language);
	}
	render(){
		let {i18nObj:i18n,language}=this.props.language;
		console.log("mmmmm",this.props.language);
		return (
			<div className="header">
				<a className={this.props.menuStatesShow?"logo":"logo"}></a>
				<nav style={{float:"right"}}>
					<li>
						<a style={{"padding":"0 25px"}} onClick={()=>{this.changeLanguage(language)}}>{i18n[0]}</a>
					</li>

				</nav>
			</div>
			)
	}
}
Header.contextTypes = {
	router:PropTypes.object
}
let mapStateToProps = (state,ownProps)=>{
  return {
		menuStatesShow:state.menuStateShow,
		language:state.changeLanguage
	}

}
let mapDispatchToProps=(dispatch,ownProps)=>{
	return {
		onClick:function(menuStateShow){
			dispatch({type:"menuStateShow",state:menuStateShow="hide"?false:true})
		},
		changeLanguage:function(language){
			console.log("this.propssss",language);
			language = language=='zh_cn' ? 'en_us':'zh_cn';
			console.log("this.props",language);
			dispatch({type:"changeLanguage",language:language})
		}
	}

}
export default connect(mapStateToProps,mapDispatchToProps)(Header)

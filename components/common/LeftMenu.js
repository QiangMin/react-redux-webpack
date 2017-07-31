import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

class LeftMenu extends React.Component{
	constructor(props) {
		super(props);
		console.log('left',this.props)
		this.getCurrentMenu=this.getCurrentMenu.bind(this);
	}
	componentDidMount(){

	}
	componentWillMount(){

	}
	getCurrentMenu(){
		console.log(this.props.location);
  		let pathname = this.props.location.pathname;
  		let paths = [
  		["template"], 
  		["togglable","togglable1","togglable2","togglable3"],
  		["test"]
			// 权限审批 5
  		],path,current=-1;
  		for(var i in paths){
  			path = paths[i];
  			path.forEach(function(item,key){
  				if(pathname.indexOf(item)>-1){
  					current = i;
  					return false;
  				}
  			});
  			if(current>-1){
  				break;
  			}
  		}
		return current;

  	}
	render (){
		let current=this.getCurrentMenu();
		let {i18nObj:i18n,language}=this.props.language;
		return (

			<div className="left-menu">
				<ul className={this.props.menuStateShow?"item-wrap":"item-wrap shrink"}>
					<li className={"item user"+(current==0 ? ' current':'')}><Link to="/template"><span>{i18n[1]}</span></Link></li>
					<li className={"item sourcemanage"+(current==1 ? ' current':'')}><Link to="/togglable"><span>{i18n[2]}</span></Link></li>
					<li className={"item sysConfig "+(current==2 ? ' current':'')}><Link to="/test"><span>{i18n[3]}</span></Link></li>
				</ul>
				<div className="left-side">
				<i onClick={()=>{this.props.onClick(this.props.menuStateShow ? 'hide':'show');}} className={this.props.menuStateShow ? 'left':'right'}>
				</i></div>
			</div>
			)
	}
}
let mapStateToProps = (state,ownProps)=>{
  return {
		menuStateShow:state.menuStateShow,
		language:state.changeLanguage
	}
}
let mapDispatchToProps=(dispatch,ownProps)=>{
	return {
		onClick:function(menuStateShow){
			dispatch({type:"menuStateShow",state:menuStateShow=="hide"?false:true})
		}
	}

}
export default connect(mapStateToProps,mapDispatchToProps)(LeftMenu)
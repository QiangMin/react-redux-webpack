import  React from 'react'
import {Link} from 'react-router'
import {render,unmountComponentAtNode} from 'react-dom'
import {connect} from 'react-redux'

class Togglable extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount() {
		
	}
	componentWillMount() {
		
	}
	render(){
		let {i18nObj:i18n}=this.props.language,
			tabIndex=0,name,des,
			path=this.props.location.pathname;
		path=path.split('/');
		name=path[2];
		des=i18n[4]; 
		if(name=="togglable1"){
			tabIndex=1;
			 des=i18n[4];
		}else if(name=="togglable2"){
			tabIndex=2;
			 des==i18n[5];
		}else if(name=="togglable3"){
			tabIndex=3;
		 	des==i18n[6];
		}

		
		return(
			<div className="content_right">
				<div className="head">{i18n[2]} 
					<span className="head-childern">&gt;</span><span className="head-childern">{des}</span>
				</div>
			
					<div className="tab">
						<Link to="/togglable/togglable1">
							<div 
							className={tabIndex==1?"tab-childern active":"tab-childern"} 
							data-index={0} style={{position:"relative"}}>
								{i18n[4]}
							</div>
						</Link>
						<Link to="/togglable/togglable2">
							<div 
							className={tabIndex==2?"tab-childern active":"tab-childern"} 
							data-index={1}>{i18n[5]}</div>
						</Link>
						<Link to="/togglable/togglable3">
							<div className={tabIndex==3?"tab-childern active":"tab-childern"} 
							data-index={2}>{i18n[6]}</div>
						</Link>
					</div>

				 {this.props.children}
			</div>
			)
	}

}
let mapStateToProps=(state,ownProps)=>{

	return {
		language:state.changeLanguage
	}
}
export default connect(mapStateToProps)(Togglable);
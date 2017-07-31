import  React from 'react'
import {Link} from 'react-router'
import {render,unmountComponentAtNode} from 'react-dom'
import {connect} from 'react-redux'

class Template extends React.Component{
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
				<div className="head">{i18n[1]}</div>
				<div className="lists">
					<div className="item-title"><i></i>hello
					{/*<Link to="/project/add" type="button" className={"btn btn-success float-left"}>
          				<span className="addImg"></span> 新建项目
                    </Link>*/}

						<div  className="search">
							<div className="input-group">
								<img src="./imgs/search.png"/>
								<input type="text" className="form-control"  placeholder={"请输入关键字"}/>
								<div className="input-group-addon search-btn" >搜索</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			)
	}

}
let mapStateToProps=(state,ownProps)=>{

	return {
		language:state.changeLanguage
	}
}
export default connect(mapStateToProps)(Template);
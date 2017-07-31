import React from 'react'
import {redner} from 'react-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';



import  "bootstrap/dist/css/bootstrap.css"
import  "bootstrap/dist/js/bootstrap.js"
import   "../css/head.less"


import Header from './common/Header'
import LeftMenu from './common/LeftMEnu'

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state= {
	      contentMinHeight:0
   		}
		this.handleResize=this.handleResize.bind(this);
	}
	componentWillMount() {

	}
	componentDidMount() {
		this.handleResize();
    	window.addEventListener("resize",this.handleResize);

	}
	componentWillUnmount() {
		window.removeEventListener("resize",this.handleResize);
	}
	handleResize(){
	    let windowHeight = $(window).height();
	    let contentHeight = $("#mainContainer").height();
	    let leftMenuHeight = $(".left-menu .item-wrap").height();
	    this.setState({contentMinHeight:Math.max(leftMenuHeight,windowHeight-60)});
  	}
  	resetState(){
        this.context.router.push('/personCenter');
  	}
	render(){
		return (

			<div>
				<Header location={this.props.location}></Header>
				<div id="content" className={this.props.menuStateShow ? 'content' :'content shrink'}>
					<LeftMenu location={this.props.location}></LeftMenu>
					<div id="mainContainer" style={{minHeight:this.state.contentMinHeight+"px"}} className="main-container">
            			{this.props.children}
          		</div>
			</div>
			</div>)

	}
}

App.contextTypes = {
  router:PropTypes.object
}

let mapStateToProps=(state,ownProps)=>{
	return {
		menuStateShow:state.menuStateShow

	}
}

export default connect(mapStateToProps)(App)

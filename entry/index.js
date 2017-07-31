import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Router,Route,hashHistory,IndexRoute,IndexRedirect,browserHistory} from 'react-router'


import reducers from '../redux/reducers'

import App from '../components/App'
import Template from '../components/main/Template'
// import Test from '../components/main/Test'
import Togglable from '../components/main/Togglable'
import Togglable1 from '../components/main/Togglable1'
import Togglable2 from '../components/main/Togglable2'
import Togglable3 from '../components/main/Togglable3'




let store = createStore(reducers)
$(function(){
	
  require.ensure([],function(){
  	const routes=(
  		<Route path="/" component={App}>
			<IndexRedirect to="/template" />
			<Route path="template" component={Template}></Route>
            <Route path="test"
            getComponent={(location, cb)=>{
                require.ensure([], (require) => {cb(null, require('../components/main/Test').default)}, 'Test')
            }}></Route>
			<Route path="togglable" component={Togglable}>
				<IndexRedirect to="togglable1" />
				<Route path="togglable1" 
				getComponent={(location, cb)=>{
                require.ensure([], (require) => {cb(null, require('../components/main/Togglable1').default)}, 'Togglable1')
            }}></Route>
				<Route path="togglable2" 
				getComponent={(location, cb)=>{
                require.ensure([], (require) => {cb(null, require('../components/main/Togglable2').default)}, 'Togglable2')
            }}></Route>
				<Route path="togglable3"
				getComponent={(location, cb)=>{
                require.ensure([], (require) => {cb(null, require('../components/main/Togglable3').default)}, 'Togglable3')
            }}></Route>
			</Route>
		</Route>
  		)

	class Root extends React.Component{

		render() {
			return(
				<Provider store={store}>
					<Router history={hashHistory}>
						{routes}
					</Router>
				</Provider>
				)
		}
	}

	render(<Root/>,document.getElementById('root'))

	},"App");

})



if(module.hot){
	module.hot.accept();
}
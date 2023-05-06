import { HashRouter,Route,Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import Layout from '../src/pages/layout/index'
import { asyncRoutes } from './routes/index';
import Login from '../src/pages/login/index'

import {Provider} from 'react-redux'
import store from '@/store/index'

function createRoutes(asyncRoutes){
  let result = []
  asyncRoutes.forEach(route => {
    if(route.path && route.element){
      result.push(
        <Route path={route.path} element={route.element} key={route.key + ''}></Route>
      )
    }
    if(route.children){
      route.children.forEach(routeChild => {
        result.push(
          <Route path={routeChild.path} element={routeChild.element} key={route.routeChild + ''}></Route>
        )
      })
    }
  });
  return result
}
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Provider store = {store}>
          <Routes>
            <Route path='/' element={<Layout/>}>
              {createRoutes(asyncRoutes)}
            </Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
        </Provider>
      </HashRouter>
     
      {/* <DemoA></DemoA>
      <hr/>
      <DemoB></DemoB> */}
    </div>
  );
}

export default App;

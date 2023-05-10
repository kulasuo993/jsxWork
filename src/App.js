import 'antd/dist/reset.css';
// import Layout from '@/pages/layout/index'
// import Login from '@/pages/login/index'

import {HashRouter} from 'react-router-dom'
// import {asyncRoutes} from './routes/index'

import {Provider} from 'react-redux'
import store from '@/store/index'
import Permission  from '@/Permission'


// function createRoutes(asyncRoutes){
//   let result = []
//   asyncRoutes.forEach(route => {
//     if(route.path && route.element){
//       result.push(
//         <Route path={route.path} element={route.element} key={route.key + ''}></Route>
//       )
//     }
//     if(route.children){
//       route.children.forEach(routeChild => {
//         result.push(
//           <Route path={routeChild.path} element={routeChild.element} key={route.routeChild + ''}></Route>
//         )
//       })
//     }
//   });
//   return result
// }

// 配置路由的第二种方法
function App() {
  return (
    <div className="App">
      <HashRouter> 
        <Provider store={store}>
          {/* <Routes>
            <Route path='/' element={<Layout/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes> */}
          <Permission/>
        </Provider>
      </HashRouter>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <HashRouter> 
//         <Provider store={store}>
//           <Routes>
//             <Route path='/' element={<Layout/>}>
//               {/* <Route path='/dashboard' element={<Dashboard/>}></Route>
//               <Route path='/good/list' element={<GoodList/>}></Route>
//               <Route path='/good/add' element={<GoodForm/>}></Route>
//               <Route path='/user' element={<User/>}></Route> */}
//               {createRoutes(asyncRoutes)}
//             </Route>
//             <Route path='/login' element={<Login/>}></Route>
//           </Routes>
//         </Provider>
//       </HashRouter>
//     </div>
//   );
// }


export default App;

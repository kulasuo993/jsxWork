import TodoList from './pages/TodoList'
import { HashRouter,Route,Routes,Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Link to='/TodoList'>TodoList</Link>

        <Routes>
          <Route path='/TodoList' element={<TodoList/>}></Route>
        </Routes>
      </HashRouter>
     
      {/* <DemoA></DemoA>
      <hr/>
      <DemoB></DemoB> */}
    </div>
  );
}

export default App;

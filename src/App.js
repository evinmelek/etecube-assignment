 import './App.css';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/User/Login';
import Register from './components/User/Register'; 
import Companies from './components/Companies/Companies';
import Products from './components/Products/Products';


function App() { 

  return (
    <div className="App"> 
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/home' element={<Home/>}></Route>   
        <Route path='/companies' element={<Companies/>}></Route>   
        <Route path='/products' element={<Products/>}></Route>   
      </Routes> 
      </BrowserRouter> 
    </div>
  );
}

export default App;

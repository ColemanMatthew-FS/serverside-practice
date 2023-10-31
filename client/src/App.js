import logo from './logo.svg';
import './App.css';
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ReactQuizzes from './pages/ReactQuizzes'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route exact path='/' element={Home}/> */}
        <Route path='/reactquizzes' element={ <ReactQuizzes/> }/>
      </Routes>
    </div>
  );
}

export default App;

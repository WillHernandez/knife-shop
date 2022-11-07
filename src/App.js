import './App.css';
import ProminentAppBar from './componenets/appbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './componenets/main';
import SignIn from './componenets/signin';
import BenchmadeMediaCard from './componenets/brands/benchmade';


function App() {
  return (
    <div>
      <ProminentAppBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<SignIn/>}></Route>
          <Route path='/Benchmade' element={<BenchmadeMediaCard/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

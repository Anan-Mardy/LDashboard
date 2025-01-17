import React from 'react';
import Launch from './components/launchData/launch';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './components/launchData/Landing';

const App = () => {
  
  return (

    <Routes>
      <Route exact path="/" element={<Landing/>} />
      <Route path='/launch' element={<Launch/>}/>
    </Routes>

  );
};

  export default App;

  

import React, { useState } from 'react';
import './App.scss';
import Planner1 from './Components/Planner1/Planner1';
import './Styles/Reset.scss';
import Planner2 from './Components/Planner2/Planner2';

const App = () => (
  <div className="container">
    <Planner2 />
  </div>
);

export default App;

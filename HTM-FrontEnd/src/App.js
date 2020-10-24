import React, { useState, useEffect } from 'react';
import './App.css';
import PetScreen from './components/PetScreen'
import PetScreen2 from './components/PetScreen2'
import TaskList from './components/TaskList'
import PetInfo from './components/PetInfo'
import shuffle from './shuffleArray'
import kajiotchi from  './images/kajiotchi.png'

import room_background from './images/room_background.jpg'

function App() {
  const pooIndices = shuffle([...Array(6).keys()])

  return (
    <div className="App">
      <header className="App-header">
        <div style={{backgroundColor:'#D96262', height:'60px', fontWeight: 'bold', fontSize: '25pt', lineHeight: '60px', textAlign:'left', paddingLeft: '10px'}}>
          <img src={kajiotchi} style={{height: '70px'}}/>
        </div>
        <div style={{display:'flex', position: 'fixed', height: '100%', width: '100%'}}>
          <div style={{backgroundColor: '#9C4650', width: '20%', height: '100%'}}>
            <TaskList/>
          </div>
          <PetContent pooIndices={pooIndices}/>
        </div>
      </header>
    </div>
  );
}

function PetContent({pooIndices}) {
  const initialPos = Math.floor(Math.random() * 4)
  const [petPosIndex, setPetPosIndex] = useState(initialPos);
  const [petData, setPetData] = useState({name: 'Bobo', birthday: '2020-10-12', colour:'#FF0000'});
  const [petHappiness, setPetHappiness] = useState(0);

  const getData = (url, setFunc) => fetch(url).then((res) => res.json()).then((data) => setFunc(data));
  
  const updatePetData = () => {
    getData("http://localhost:5000/users/87/pet", setPetData);
    getData("http://localhost:5000/users/87/pet/happiness", setPetHappiness)
  }

  useEffect(() => {
      updatePetData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePetData();
      setPetPosIndex(Math.floor(Math.random() * 4));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{width:'80%'}}>
      <div style={{height: '75%', padding: '20px'}}>
        <div style={{width:'100%', height:'100%',backgroundImage: `url(${room_background})`, backgroundRepeat:'no-repeat', backgroundSize:'100%'}}>
          <PetScreen2 petPosIndex={petPosIndex} pooIndices={pooIndices} happiness={petHappiness} petColor={petData.colour}/>
        </div>
      </div>
      <div style={{backgroundColor:'#883543', height: '25%', width:'100%', bottom:'0'}}>
        <PetInfo name={petData.name} birthday={petData.birthday} happiness={petHappiness}/>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import petimagechild from '../images/petimagechild.jpg'

function PetScreen() {
  // Old pet screen, currently taking parts into PetScreen2
  const [response, setResponseData] = useState('');
  const getData = () => fetch("http://localhost:5000/users/87/pet").then((res) => res.json());
  useEffect(() => {
      getData().then((data) => setResponseData(data))
  }, [])

  let petName = response.name 
  let happinessLevel = 10
  let status 

  if (happinessLevel >= 0){
    status = "Happy"
  } else {
    status = "Sad"
  }

  return (
    <div style={{backgroundColor: response.colour, width: '600px', height: '400px'}}>
      <div style={{color:"black"}}>
        Name: {petName}
      </div>
      <img src={petimagechild} width="500"/>
      <div style={{color:"black"}}>
        Happiness Level: {status} 
      </div> 
    </div>
  );
}

export default PetScreen;

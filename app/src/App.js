import './App.css';
import Alunno from './Alunno.js';
import { useState, useEffect } from 'react';


function App() {
  const [alunni, setAlunni] = useState([]);
  const[inCaricamento, setInCaricamento] = useState(false);


  useEffect(() => {
    loadAlunni();  
  }, [])

  async function loadAlunni(){
    setInCaricamento(true);
    const response =  await fetch(`http://localhost:8080/alunni`, {method: "GET"});
    const a = await response.json();
    setAlunni(a);
    setInCaricamento(false);
  };

  return (
    <div className="App">
      <button onClick={loadAlunni}>Carica alunni</button>
      <hr />
      { 
        inCaricamento ? 
          <div>In caricamento... </div>
        :
          alunni.map((alunno) => (
            <Alunno alunno={alunno} loadAlunni={loadAlunni}  key={alunno.id} />
          ))
      }
    </div>
  );
}

export default App;





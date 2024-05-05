import './App.css';
import Alunno from './Alunno.js';
import Inserimento from './Inserimento.js';
import { useEffect, useState } from 'react';

function App() {
  //Variabili di stato
  const [inCaricamento, setInCaricamento] = useState(false);
  const [alunni, setAlunni] = useState([]);
  const [insert, setInsert] = useState(true);

  async function caricaAlunni(){
    setInCaricamento(true);
    const response = await fetch("http://localhost:8080/alunni", {method: "GET"});
    const alunni_get = await response.json();
    setAlunni(alunni_get);
    setInCaricamento(false);
  }

  useEffect(() => {
    caricaAlunni();
  }, [])

  return (
    <div className="App">
      { 
        inCaricamento ?
          <div className="carica">In caricamento...</div>
        :
        (
          <>
          <button onClick={caricaAlunni} className="bottone">Carica alunni</button>
          <hr />
          {
            alunni.map((alunno) => (
              <Alunno alunno={alunno} caricaAlunni={caricaAlunni} setInsert={setInsert} key={alunno.id}/>
            ))
          }
          <Inserimento caricaAlunni={caricaAlunni} insert={insert}/>
          </>
        )
      }
    </div>
  );
}

export default App;
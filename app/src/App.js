import './App.css';
import Alunno from './Alunno.js';
import { useState, useEffect } from 'react';


function App() {
  //VARIABILI DI STATO
  const [alunni, setAlunni] = useState([]);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [insert, setInsert] = useState(true);

  //PER FORM
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

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


  async function salvaAlunno(){
    await fetch(`http://localhost:8080/alunni`, 
      {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({nome: nome, cognome: cognome})
      }
    );
    loadAlunni();
    setShowForm(false);
  }

  function gestisciCambioNome(e){
    setNome(e.target.value);
  }

  function gestisciCambioCognome(e){
    setCognome(e.target.value);
  }

  return (
    <div className="App">
      {
        !inCaricamento &&
        <>
        <button onClick={loadAlunni} className='bottone'>Carica alunni</button>
        <hr />
        </>
      }
      { 
        inCaricamento ? 
          <div className='carica'>In caricamento... </div>
        :
          alunni.map((alunno) => (
            <Alunno alunno={alunno} loadAlunni={loadAlunni}  key={alunno.id} setInsert={setInsert}/>
          ))
      }
      <br />
      <br />
      {
        !inCaricamento &&
        <>
        {
          insert &&
            <button onClick={() => setShowForm(true)} className='bottone'>Inserisci nuovo alunno</button>
        }
        
        { showForm &&
          <div>
            <h1>Form di inserimento</h1>
            <h2>Nome:     <input type="text" onChange={gestisciCambioNome} value={nome} placeholder="Inserisci il nome" required></input> </h2>
            <h2>Cognome:  <input type="text" onChange={gestisciCambioCognome} value={cognome} placeholder="Inserisci il cognome" required></input> </h2>
            <br />
            <button onClick={salvaAlunno} className='bottone'>Salva</button>
            <button onClick={() => setShowForm(false)} className='bottone'>Annulla</button>
          </div>
        }
        </>
      }
    </div>
  );
}

export default App;
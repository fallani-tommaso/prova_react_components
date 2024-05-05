import "./App.css";
import { useState } from "react";

export default function Inserimento({ caricaAlunni, insert }) {
  //Variabili di stato
  const [showForm, setShowForm] = useState(false);

  //Variabili di stato per form
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  function gestisciCambioNome(e) {
    setNome(e.target.value);
  }

  function gestisciCambioCognome(e) {
    setCognome(e.target.value);
  }

  async function salvaAlunno() {
    await fetch(`http://localhost:8080/alunni`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });
    caricaAlunni();
    setShowForm(false);
  }

  return (
    <>
      {
        !showForm ?
        (
            <>
            {
                insert &&
                <button onClick={() => setShowForm(true)} className="bottone">Inserisci nuovo alunno</button>
            }
            </>
        )
        :
        (
        <div>
          <h1>Form di inserimento</h1>
          <h2>Nome: <input type="text" onChange={gestisciCambioNome} value={nome} placeholder="Inserisci il nome"/></h2>
          <h2>Cognome: <input type="text" onChange={gestisciCambioCognome} value={cognome} placeholder="Inserisci il cognome"/></h2>
          <br />
          <button onClick={salvaAlunno} className="bottone">Salva</button>
          <button onClick={() => setShowForm(false)} className="bottone">Annulla</button>
        </div>
        )}
    </>
  );
}
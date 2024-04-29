import { useState } from "react";

export default function Alunno({ alunno, loadAlunni }) {
  //VARIABILI DI STATO
  const [contatore, setContatore] = useState(alunno.id);
  const [inCancellazione, setInCancellazione] = useState(false);
  const [inConferma, setInConfermaCancellazione] = useState(false);
  const [inModifica, setInModifica] = useState(false);
  const [showModifica, setShowModifica] = useState(false);

  //PER FORM
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  function incrementaNumero() {
    setContatore(contatore + 1);
  }

  async function cancellaAlunno() {
    setInCancellazione(true);
    const response = await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "DELETE",
    });
    loadAlunni();
    setInCancellazione(false);
  }

  function richiediConferma() {
    setInConfermaCancellazione(true);
  }

  function annullaCancellazione() {
    setInConfermaCancellazione(false);
  }

  async function modificaAlunno() {
    setShowModifica(true);
    await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome })
    });
    loadAlunni();
    setShowModifica(false);
  }

  function richiediModifica(){
    setInModifica(true);
  }

  function annullaModifica() {
    setInModifica(false);
  }

  function gestisciCambioNome(e) {
    setNome(e.target.value);
  }

  function gestisciCambioCognome(e) {
    setCognome(e.target.value);
  }

  return (
    <div>
      <p className="paragrafo">
        {!showModifica && <>{`${alunno.nome} ${alunno.cognome} `}</>}
        <button onClick={incrementaNumero} className="bottone">
          {contatore}
        </button>
        {inCancellazione ? (
          <div className="elimina_modifica">Cancellazione in corso...</div>
        ) : (
          <span className="conferma">
            {inConferma ? (
              <div>
                <br />
                <span>
                  Sei sicuro?
                  <button onClick={cancellaAlunno} className="bottone">si</button>
                  <button onClick={annullaCancellazione} className="bottone">no</button>
                </span>
              </div>
            ) : (
              <span>
                { !inModifica &&
                  <button onClick={richiediConferma} className="bottone">Cancella</button>
                }
              </ span>
            )}
          </span>
        )}

        {showModifica ? (
          <div className="elimina_modifica">Modifica in corso...</div>
        ) : (
          <span className="conferma">
            {inModifica ? (
              <div>
                <br />
                <input type="text" onChange={gestisciCambioNome} value={nome} placeholder="Inserisci il nome"></input>
                <input type="text" onChange={gestisciCambioCognome} value={cognome} placeholder="Inserisci il cognome"></input>
                <br />
                <br />
                <button onClick={modificaAlunno} className="bottone">Salva modifica</button>
                <button onClick={annullaModifica} className="bottone">Annulla modifica</button>
              </div>
            ) 
            : (
              <span>
                {!inConferma && (
                  <button onClick={richiediModifica} className="bottone">Modifica</button>
                )}
              </span>
            )
            }
          </span>
        )
        }
        <hr />
      </p>
    </div>
  );
}

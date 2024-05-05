import "./App.css";
import { useState } from "react";

export default function Modifica({ id, setInsert, caricaAlunni, inModifica, setInModifica, inConferma, showModifica, setShowModifica }) {
    
    //Variabili di stato per form
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");

    async function modificaAlunno() {
        setShowModifica(true);
        await fetch(`http://localhost:8080/alunni/${id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ nome: nome, cognome: cognome })
        });
        caricaAlunni();
        setShowModifica(false);
        setInsert(true);
      }
    
      function richiediModifica(){
        setInsert(false);
        setInModifica(true);
      }
    
      function annullaModifica() {
        setInsert(true);
        setInModifica(false);
      }
    
      function gestisciCambioNome(e) {
        setNome(e.target.value);
      }
    
      function gestisciCambioCognome(e) {
        setCognome(e.target.value);
      }



return(
    <>
    {showModifica ? (
          <div className="elimina_modifica">Modifica in corso...</div>
        ) 
        : 
        (
          <span className="conferma">
            {inModifica ? (
              <>
                <br />
                <input type="text" onChange={gestisciCambioNome} value={nome} placeholder="Inserisci il nome"></input>
                <input type="text" onChange={gestisciCambioCognome} value={cognome} placeholder="Inserisci il cognome"></input>
                <br />
                <br />
                <button onClick={modificaAlunno} className="bottone">Salva modifica</button>
                <button onClick={annullaModifica} className="bottone">Annulla modifica</button>
              </>
            ) 
            : (
              <>
                {!inConferma && 
                  <button onClick={richiediModifica} className="bottone">Modifica</button>
                }
              </>
            )
            }
          </span>
        )
        }
    </>
);
}
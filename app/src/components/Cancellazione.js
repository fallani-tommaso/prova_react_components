import "./App.css";
import { useState } from "react";

export default function Cancellazione({ id, setInsert, caricaAlunni, inConferma, setInConferma, inModifica}) {
    //Variabili di stato
    const [inCancellazione, setInCancellazione] = useState(false);
    
    async function cancellaAlunno() {
        setInCancellazione(true);
        await fetch(`http://localhost:8080/alunni/${id}`, 
        {
          method: "DELETE",
        });
        caricaAlunni();
        setInCancellazione(false);
      }
    
      function richiediConferma() {
        setInsert(false);
        setInConferma(true);
      }
    
      function annullaCancellazione() {
        setInsert(true);
        setInConferma(false);
      }

return(
    <>
    {inCancellazione ? (
        <div className="elimina_modifica">Cancellazione in corso...</div>
      ) 
      : 
      (
        <span className="conferma">
          {inConferma ? (
            <>
              <br />
              <br />
              Sei sicuro?
              <button onClick={cancellaAlunno} className="bottone">si</button>
              <button onClick={annullaCancellazione} className="bottone">no</button>
            </>
          ) : 
            (
            <>
              { !inModifica &&
                <>
                {" "}
                <button onClick={richiediConferma} className="bottone">Cancella</button>
                {" "}
                </>
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
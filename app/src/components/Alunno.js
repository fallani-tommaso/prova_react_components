import { useState } from 'react';
import './App.css';
import Cancellazione from './Cancellazione.js';
import Modifica from './Modifica.js';

export default function Alunno({ alunno, caricaAlunni, setInsert}) {
//Variabili di stato
const [inModifica, setInModifica] = useState(false);
const [inConferma, setInConferma] = useState(false);
const [inCancellazione, setInCancellazione] = useState(false);
const [showModifica, setShowModifica] = useState(false);

return(
    <div>
    <p className="paragrafo">
        {
            //Per non far vedere nome e cognome quando sto cancellando o modificando
            (!inCancellazione && !showModifica) &&
            <>
                {` ${alunno.nome} ${alunno.cognome} `}
            </>   
        }
        <Cancellazione id={alunno.id} setInsert={setInsert} caricaAlunni={caricaAlunni} inConferma={inConferma} setInConferma={setInConferma} inModifica={inModifica} inCancellazione={inCancellazione} setInCancellazione={setInCancellazione}/>
        <Modifica id={alunno.id} setInsert={setInsert} caricaAlunni={caricaAlunni} inModifica={inModifica} setInModifica={setInModifica} inConferma={inConferma} showModifica={showModifica} setShowModifica={setShowModifica}/>
    </p>
    </div>
);
}
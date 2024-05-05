import { useState } from 'react';
import './App.css';
import Cancellazione from './Cancellazione.js';
import Modifica from './Modifica.js';

export default function Alunno({ alunno, caricaAlunni, setInsert}) {
//Variabili di stato
const [inModifica, setInModifica] = useState(false);
const [inConferma, setInConferma] = useState(false);

return(
    <div>
    <p className="paragrafo">
        {alunno.nome} {alunno.cognome}
        <Cancellazione id={alunno.id} setInsert={setInsert} caricaAlunni={caricaAlunni} inConferma={inConferma} setInConferma={setInConferma} inModifica={inModifica}/>
        <Modifica id={alunno.id} setInsert={setInsert} caricaAlunni={caricaAlunni} inModifica={inModifica} setInModifica={setInModifica} inConferma={inConferma}/>
    </p>
    </div>
);
}
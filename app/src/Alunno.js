import {useState} from 'react';

export default function Alunno({alunno, loadAlunni}){

    const [inCancellazione, setInCancellazione] = useState(false);
    const [inConferma, setInConferma] = useState(false);

    async function cancellaAlunno(){
        setInCancellazione(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`, {method: "DELETE"});
        loadAlunni();
        setInCancellazione(false);
    }
    function richiediConferma(){
        setInConferma(true);
    }
    function annulla(){
        setInConferma(false);
    }
    return(
        <div>
            {alunno.id} - {alunno.nome} {alunno.cognome} -
            { inCancellazione ?
                <span> in cancellazione... </span>
            :
                <span>
                    { inConferma ?
                        <span>Sei sicuro? 
                        <button onClick={cancellaAlunno}>si</button>
                        <button onClick={annulla}>no</button></span>
                        :
                        <button onClick={richiediConferma}>Cancella alunno</button>
                    }
                </span>
            }
            <hr />
        </div>
    );
}
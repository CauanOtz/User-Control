import react, {useState} from 'react';
function Btn (onClick){
    return(
        <>
            <div>
                <button onClick={onClick.click}>Adicionar</button>
            </div>
        </>
    )
}

export default Btn;
import React from 'react';

function Btn({ click, className }) {
    return (
        <button onClick={click} className={className || 'btn btn-primary'}>
            Adicionar
        </button>
    );
}

export default Btn;

import React from 'react';
import './input.css';
function Input(props) {
    return (
        <input 
          type="text" 
          id={props.id} 
          value={props.value} 
          onChange={props.onChange} // Mudança aqui
          required 
        />
    );
}

export default Input;

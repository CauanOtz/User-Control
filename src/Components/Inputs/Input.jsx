import React from 'react';
import './input.css';

function Input(props) {
    return (
        <input 
          type="text" 
          id={props.id} 
          value={props.value} 
          onChange={props.onChange} 
          placeholder={props.placeholder} 
          required 
          className={props.className}
        />
    );
}

export default Input;

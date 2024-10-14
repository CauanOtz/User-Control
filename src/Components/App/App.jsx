import { useState } from 'react';
import Saudacao from '../Saudacao/Saudacao';
import Btn from './Button/btn.jsx';
import Input from './Inputs/Input.jsx'; // Importe o componente Input
import './App.css';

function App() {
  const [nomesValores, setNomesValores] = useState([]); // Armazena pares de nome e valor
  const [inputValue, setInputValue] = useState(''); 
  const [inputValValue, setInputValValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() !== '' && inputValValue.trim() !== '') {
      // Adiciona um novo objeto com nome e valor ao array
      setNomesValores([...nomesValores, { nome: inputValue, valor: inputValValue }]);
      setInputValue(''); // Limpa o input do nome
      setInputValValue(''); // Limpa o input do valor
    }
  };

  return (
    <>
      <div>
        {/* Passando as propriedades para o componente Input */}
        <Input 
          id='names' 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <Input 
          id='values' 
          value={inputValValue} 
          onChange={(e) => setInputValValue(e.target.value)} 
        />
        
        <Btn click={handleAdd} />
      </div>

      <div>
        {nomesValores.map((item, index) => (
          <div key={index}>
            <Saudacao nome={item.nome} valor={item.valor} />
          </div>
        ))}

        {console.log(nomesValores)}
      </div>
    </>
  );
}

export default App;

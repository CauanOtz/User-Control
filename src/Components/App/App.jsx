import { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import Saudacao from '../Saudacao/Saudacao';
import './App.css';

function App() {
  // Inicializando o estado com um array vazio
  const [nomes, setNomes] = useState([]);
  const [inputValue, setInputValue] = useState(''); // Estado para controlar o valor do input

  // Função para lidar com o valor do input e adicionar um novo nome
  const handleAddName = () => {
    if (inputValue.trim() !== '') {
      // Adiciona o novo nome ao array sem modificar o estado original
      setNomes([...nomes, inputValue]);
      setInputValue(''); // Limpa o input após adicionar o nome
    }
  };

  return (
    <>
      <div>
        {/* Input controlado pelo estado */}
        <input 
          type="text" 
          id='names'
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} // Atualiza o estado quando o input muda
        />

        {/* Botão que adiciona o nome ao array */}
        <button onClick={handleAddName}>Adicionar Nome</button>
      </div>

      {/* Renderiza os nomes adicionados */}
      <div>
        {nomes.map((nome, index) => (
          <Saudacao key={index} nome={nome} /> // Passa o nome como prop para o componente Saudacao
        ))}

        {console.log(nomes)}
      </div>
    </>
  );
}

export default App;

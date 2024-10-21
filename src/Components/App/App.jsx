import { useState } from 'react';
import Saudacao from '../Saudacao/Saudacao';
import Btn from '../Button/btn.jsx';
import Input from '../Inputs/Input.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import do Bootstrap
import './App.css';

function App() {
  const [nomesValores, setNomesValores] = useState([]); 
  const [inputValue, setInputValue] = useState(''); 
  const [inputValValue, setInputValValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() !== '' && inputValValue.trim() !== '') {
      setNomesValores([...nomesValores, { nome: inputValue, valor: inputValValue }]);
      setInputValue(''); 
      setInputValValue(''); 
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Cadastro de Nomes e Valores</h3>
            <div className="row">
              {/* Espaçamento melhorado com mb-4 para os inputs */}
              <div className="mb-4">
                <Input 
                  id="names" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)} 
                  placeholder="Digite um nome"
                  className="form-control"
                />
              </div>
              <div className="">
                <Input 
                  id="values" 
                  value={inputValValue} 
                  onChange={(e) => setInputValValue(e.target.value)} 
                  placeholder="Digite um valor"
                  className="form-control"
                />
              </div>
              
              {/* Alinhando o botão no centro da coluna com d-flex e align-items-center */}
              <div className="mt-5">
                <Btn click={handleAdd} className="btn btn-primary w-100 shadow-sm">
                  Adicionar
                </Btn>
              </div>
            </div>

            {nomesValores.length > 0 && (
              <div className="d-flex justify-content-center mt-4">
                <div className="table-responsive w-75">
                  <table className="table table-hover table-bordered rounded">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nomesValores.map((item, index) => (
                        <tr key={index}>
                          <td>{item.nome}</td>
                          <td>{item.valor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {nomesValores.length === 0 && (
              <div className="alert alert-info text-center mt-3">
                Nenhum nome e valor adicionados ainda.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

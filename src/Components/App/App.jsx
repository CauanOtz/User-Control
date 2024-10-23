import { useState } from 'react';
import Btn from '../Button/btn.jsx';
import Input from '../Inputs/Input.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

function App() {
  const [nomesValores, setNomesValores] = useState([]); 
  const [inputValue, setInputValue] = useState(''); 
  const [inputValValue, setInputValValue] = useState('');
  const [inputPercent, setInputPercent] = useState(''); // Novo campo para porcentagem

  const handleAdd = () => {
    if (inputValue.trim() !== '' && inputValValue.trim() !== '' && inputPercent.trim() !== '') {
      setNomesValores([...nomesValores, { nome: inputValue, valor: inputValValue, crescimento: inputPercent }]);
      setInputValue(''); 
      setInputValValue(''); 
      setInputPercent(''); 
    }
  };

  const handleValorChange = (e) => {
    const valor = e.target.value;
    const valorFormatado = formatarValorMonetario(valor);
    setInputValValue(valorFormatado);
  };


  const formatarValorMonetario = (valor) => {
    const valorLimpo = valor.replace(/\D/g, ""); 
    const valorNumerico = (Number(valorLimpo) / 100).toFixed(2); 
    return valorNumerico.replace(".", ","); 
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Cadastro de Ações Fictícias</h3>
            <div className="row">
              <div className="col-md-4 mb-4">
                <Input 
                  id="names" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)} 
                  placeholder="Digite o nome"
                  className="form-control"
                />
              </div>

              <div className="col-md-4 mb-4">
                <Input 
                  id="values" 
                  value={inputValValue} 
                  onChange={handleValorChange} // Formatação monetária
                  placeholder="Digite o valor"
                  className="form-control"
                />
              </div>
              
              <div className="col-md-4 mb-4">
                <Input 
                  id="percent" 
                  value={inputPercent} 
                  onChange={(e) => setInputPercent(e.target.value)} 
                  placeholder="Digite o % de crescimento"
                  className="form-control"
                />
              </div>
              
              <div className="mt-5 d-flex justify-content-center">
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
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Valor (R$)</th>
                        <th scope="col">% Crescimento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nomesValores.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td> 
                          <td>{item.nome}</td>
                          <td>{item.valor}</td>
                          <td>{item.crescimento}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {nomesValores.length === 0 && (
              <div className="alert alert-info text-center mt-3">
                Nenhuma ação adicionada ainda.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import Btn from '../Button/btn.jsx';
import Input from '../Inputs/Input.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [nomesValores, setNomesValores] = useState([]); 
  const [inputValue, setInputValue] = useState(''); 
  const [inputValValue, setInputValValue] = useState('');
  const [inputPercent, setInputPercent] = useState(''); 
  const [searchTerm, setSearchTerm] = useState(''); // Filtro (Dps preciso mudar)
  const [sortOrder, setSortOrder] = useState('asc'); // Ordenação (ascendente/descendente)

  // Armazenando os dados no localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('nomesValores'));
    if (savedData) {
      setNomesValores(savedData);
    }
  }, []);

  // Salvar dados no LocalStorage sempre que algo mudar
  useEffect(() => {
    localStorage.setItem('nomesValores', JSON.stringify(nomesValores));
  }, [nomesValores]);

  const handleAdd = () => {
    if (inputValue.trim() === '' || inputValValue.trim() === '' || inputPercent.trim() === '') {
      Swal.fire('Erro', 'Todos os campos devem ser preenchidos!', 'error');
      return;
    }

    if (!isNaN(inputValue)) {
      Swal.fire('Erro', 'O nome não pode conter números!', 'error');
      return;
    }

    setNomesValores([...nomesValores, { nome: inputValue, valor: inputValValue, crescimento: inputPercent }]);
    setInputValue('');
    setInputValValue('');
    setInputPercent('');
    Swal.fire('Sucesso', 'Ação adicionada com sucesso!', 'success');
  };

  const handleValorChange = (e) => {
    const valor = e.target.value;
    const valorFormatado = formatarValorMonetario(valor);
    setInputValValue(valorFormatado);
  };

  const formatarValorMonetario = (valor) => {
    const valorLimpo = valor.replace(/\D/g, ''); 
    const valorNumerico = (Number(valorLimpo) / 100).toFixed(2); 
  
    return valorNumerico.replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace('.', ',');
  };
  

  const handleRemove = (index) => {
    const updatedList = nomesValores.filter((_, i) => i !== index);
    setNomesValores(updatedList);
    Swal.fire('Removido', 'Ação removida com sucesso!', 'success');
  };

  const handleEdit = (index) => {
    const item = nomesValores[index];
  
    Swal.fire({
      title: 'Editar Ação',
      html:
        `<input id="editName" class="swal2-input" value="${item.nome}" placeholder="Nome">` +
        `<input id="editValue" class="swal2-input" value="${item.valor}" placeholder="Valor (R$)" oninput="this.value = formatarValorMonetario(this.value)">` +
        `<input id="editGrowth" class="swal2-input" value="${item.crescimento}" placeholder="Crescimento (%)">`,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      preConfirm: () => {
        const editedName = document.getElementById('editName').value;
        const editedValue = document.getElementById('editValue').value;
        const editedGrowth = document.getElementById('editGrowth').value;
        if (!editedName || !editedValue || !editedGrowth) {
          Swal.showValidationMessage('Preencha todos os campos');
          return false;
        }
        return { nome: editedName, valor: editedValue, crescimento: editedGrowth };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedList = [...nomesValores];
        updatedList[index] = result.value;
        setNomesValores(updatedList);
        Swal.fire('Sucesso', 'Ação editada com sucesso!', 'success');
      }
    });
  };
  
  window.formatarValorMonetario = (valor) => {
    const valorLimpo = valor.replace(/\D/g, ''); 
    const valorNumerico = (Number(valorLimpo) / 100).toFixed(2); 
    return valorNumerico.replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace('.', ',');
  };
  

  // Filtro e Ordenação
  const filteredData = nomesValores
    .filter((item) => item.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome));

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
                  onChange={handleValorChange} 
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

              <div className="col-md-12 mb-4">
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nome"
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
              <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-secondary" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                  Ordenar {sortOrder === 'asc' ? 'Descendente' : 'Ascendente'}
                </button>
              </div>
            )}

            {filteredData.length > 0 ? (
              <div className="d-flex justify-content-center mt-4">
                <div className="table-responsive w-75">
                  <table className="table table-hover table-bordered rounded">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Valor (R$)</th>
                        <th scope="col">% Crescimento</th>
                        <th scope="col">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td> 
                          <td>{item.nome}</td>
                          <td>{item.valor}</td>
                          <td>{item.crescimento}%</td>
                          <td>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>Editar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemove(index)}>Remover</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="alert alert-info text-center mt-3">
                Nenhuma ação encontrada.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

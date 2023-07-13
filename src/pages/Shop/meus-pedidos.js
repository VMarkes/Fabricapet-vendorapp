import Button from '@mui/material/Button';
import * as React from "react";
import { useEffect, useState } from "react";
import './meus-pedidos.css';
import Modal from './Modal';
import Grid from '@mui/material/Unstable_Grid2';
import Header from '../../Header/Header';

function MeusPedidos() {
  const [keys, setKeys] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {

    const chaves = Object.keys(localStorage);
    const regex = /^id\w{1} \w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/;
    const pedidosNoLocalStorage = chaves.filter(chave => regex.test(chave));

    setKeys(pedidosNoLocalStorage);
  }, 0);

    const handleOpenModal = (id) => {
      const value = localStorage.getItem(id);
      setModalData({ id, value });
      setShowModal(true);
    };

    function handleRemoveKey(key) {   
      const confirmed = window.confirm("Você tem certeza que deseja cancelar o pedido?");
      
      if (confirmed) {
        localStorage.removeItem(key);
        window.location.reload();
      }
    }

  const handleGetValue = (key, valueKey) => {
    const valueString = localStorage.getItem(key);
    const value = JSON.parse(valueString);

    return value[valueKey];
  };

  const handleGetValueProducts = (key, valueKey) => {
    const valueString = localStorage.getItem(key);
    const value = JSON.parse(valueString);

    return value.produtos[0][valueKey];
  };

  const handleGetTotalPrice = (key) => {
    const valueString = localStorage.getItem(key);
    const value = JSON.parse(valueString);

    let total = 0;

    // Percorra a lista de produtos
    for (let i = 0; i < value.produtos.length; i++) {
      // Obtenha o produto atual
      const produto = value.produtos[i];

      // Calcule o total do produto
      const produtoTotal = parseFloat(produto.preco) * produto.quantidade;

      // Adicione o total do produto ao total geral
      total += produtoTotal;
    }

    // O valor de total agora contém o valor total de todos os produtos
    console.log(total);
      
    return total;
  };

  return (
    <div className="orders">
      <Header />
      <div className="myOrders">
        <h1>Meus Pedidos</h1>
        {keys.map((key) => (
          <div className="prevCarrinho" key={key}>
            <h2>Pedido: #{key.substring(2, 4)}</h2>
            <Grid className="grid">  
                  <p>{handleGetValue(key, "client")}</p>
                  <p>R$ {handleGetTotalPrice(key, "preco")}</p>
                  <Button key={key} onClick={() => handleOpenModal(key)}>Abrir Pedido</Button>
                  <button className="rmvBtn" onClick={() => handleRemoveKey(key)}>Cancelar pedido</button>
            </Grid>
            {showModal && 
            <Modal key={modalData.key} value={modalData.value} open={showModal} onClose={() => setShowModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <div>{modalData.value}</div>
            </Modal>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeusPedidos;
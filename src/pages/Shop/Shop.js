import React, { useEffect, useState } from "react";
import csvData from "../../products.csv";
import './Shop.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Header from "../../Header/Header";
import { Sliderify } from "react-sliderify";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import InnerImageZoom from 'react-inner-image-zoom';
import './zoom.css';

function Shop() {
  const [produtos, setProdutos] = useState([] || new Array(2).fill());
  const [carrinho, setCarrinho] = useState([]);
  const [valorDaBusca, setValorDaBusca] = useState("");

  useEffect(() => {
    // Faz a leitura do arquivo CSV e armazena os dados na variável de estado 'produtos'
    fetch(csvData)
      .then((response) => response.text())
      .then((data) => {
        const parsedData = data
        .split("\n")
        .map((row) => row.split(","))
        .slice(1) // remove a primeira linha (cabeçalho)
        .map((produto) => ({...produto, quantidade: 0})) // adiciona a propriedade quantidade ao objeto de produto
        .map((row) => ({
          id: row[0],
          referencia: row[1],
          nome: row[2],
          ean: row[3],
          preco: row[4],
          imagem: row[5],
          color: row[6],
          size: row[7],
          group: row[8],
          subgroup: row[9],
        }));
        parsedData.pop(); // remove o último item do array pois é um item vazio
        setProdutos(parsedData);
      });
  }, []);

  // Agrupa os produtos pelo nome
  function groupProducts(produtos) {
    return produtos.reduce((grouped, product) => {
      const { id, nome, size, color, preco, ean, referencia, imagem, group, subgroup } = product;
  
      if (grouped[nome]) {
        grouped[nome].options.push({ id, nome, size, color, preco, ean, referencia, imagem, group, subgroup });
      } else {
        grouped[nome] = { nome, options: [{ id, nome, size, color, preco, ean, referencia, imagem, group, subgroup }] };
      }
  
      return grouped;
    }, {});
  }

  const groupedProducts = groupProducts(produtos);

  // Estado para armazenar o tamanho selecionado
  const [selectedSize, setSelectedSize] = useState();

  // Função para atualizar o estado com o tamanho selecionado
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  // Função para adicionar um item ao carrinho
  function adicionarAoCarrinho(produto) {
    const novoCarrinho = [...carrinho];

    if (!produto || !produto.id) {
      return (toast.warning("Por favor, selecione um produto", {autoClose: 500}));
    }
  
    // Verifica se o item já está no carrinho
    const itemIndex = novoCarrinho.findIndex((carrinhoItem) => carrinhoItem.id === produto.id);
  
    if (itemIndex >= 0) {
      // Se o item já estiver no carrinho, cria um novo objeto com a quantidade atualizada
      const novoItem = {
        ...novoCarrinho[itemIndex],
        quantidade: novoCarrinho[itemIndex].quantidade + 1
      };
      novoCarrinho[itemIndex] = novoItem;
    } else {
      // Caso contrário, adiciona um novo item com quantidade 1
      novoCarrinho.push({ ...produto, quantidade: 1 });
    }
  
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  
    toast.success("Produto adicionado no carrinho", {autoClose: 500});
  }

  // Função para remover um item do carrinho
  function removerDoCarrinho(index) {
    const novoCarrinho = [...carrinho];
    const item = carrinho[index];

    if (item.quantidade === 1) {
    // se o item tem apenas uma quantidade, remove-o do carrinho
    novoCarrinho.splice(index, 1);
    } else {
    // caso contrário, decrementa a quantidade
    novoCarrinho[index].quantidade -= 1;
    }

    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

    toast.error("Produto removido do carrinho", {autoClose: 500});
  }

  // Calcula o total de produtos
    const totalProdutos = carrinho.reduce((total, item) => {
      return total + item.quantidade;
    }, 0);
  
  // Calcula o total do valor
  const totalValor = carrinho.reduce((total, item) => {
    const preco = isNaN(item.preco) ? 0 : item.preco;
    return total + (item.quantidade * preco);
  }, 0);

  //Função de busca
  function handleSubmit (e) {
    setValorDaBusca(e.target.value);

    e.preventDefault();

      const produtosFiltrados = produtos.filter(
        produto => 
        (produto.nome || []).toString().toLowerCase().includes(valorDaBusca) ||
        (produto.color || []).toString().toLowerCase().includes(valorDaBusca) ||
        (produto.referencia || []).includes(valorDaBusca) || 
        (produto.ean || []).includes(valorDaBusca)
      );
      setProdutos(produtosFiltrados);
  }

  //Limpar Busca
  function Clear() {
    window.location.reload();
  }

  // Busca carrinho do localstorage na montagem do componente
  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho"));
    setCarrinho(carrinhoSalvo || []);
  }, []);

  // Abre Modal na versão mobile
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Estilo da "Box"
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "90%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    borderRadius: "10px",
  };

  return (
    <div className="container">
      <Header />
      <div className="search">
                    <form className="form-search">
                      <input id="busca" type="text" placeholder=" " onChange={handleSubmit} />
                      <label>Encontre seu produto</label>
                    </form>
                    <button className="btn-search" onClick={Clear}>Limpar</button>
                  </div>
            <div className="btnMobile">
              <Button className="btn-total-mobile" onClick={handleOpen}>Ver total</Button>
            </div>
            <div className="shop-container">
              <h1>Produtos</h1>
                <div className="products" >
                    {/* Itera sobre os grupos de produtos e exibe cada um */}
                    {Object.entries(groupedProducts).map(([chave, group]) => (
                      <div className="productsList" key={group}>
                        <h2 title={group.nome} style={{ fontSize: '22px', padding: '2px' }}>{group.nome}</h2>
                        <div>
                          <Sliderify showSpot={false} activeColor="#1e9ac7" navPrevIcon={<KeyboardArrowLeftIcon sx={{ color: "#1e9ac7"}} />} navNextIcon={<KeyboardArrowRightIcon sx={{ color: "#1e9ac7"}} />} autoPlay={false} className="slider">
                            {group.options.map((option) => (
                              <div className="img-container" key={option} >
                                <InnerImageZoom zoomScale="0.75" zoomType="hover" fullscreenOnMobile={true} src={option.imagem} zoomSrc={option.imagem} />
                              </div>
                            ))}
                          </Sliderify>
                        </div>
                        <br/>
                        {/* Select para escolher o tamanho */}
                        <select className="select-size" onChange={handleSizeChange}>
                          {/* Opções de tamanho */}
                          <option>Tamanhos:</option>
                          {group.options.map((option) => (
                            <option className="options-size" key={option} value={option.id}>
                              {option.size} - {option.color}
                            </option>
                          ))}
                        </select>
                        {/* Exibe o preço do tamanho selecionado */}
                        <br />
                        <br />
                        <p style={{ fontSize: '13px', padding: '2px' }}><b>Ref.:</b> {group.options.find(option => option.id === selectedSize)?.referencia}</p>
                        <p style={{ fontSize: '13px', padding: '2px' }}><b>EAN:</b> {group.options.find(option => option.id === selectedSize)?.ean}</p>
                        <p style={{ fontSize: '13px', padding: '2px' }}><b>Tamanho:</b> {group.options.find(option => option.id === selectedSize)?.size}</p>
                        <hr />
                        <p><b>R$:</b> {group.options.find(option => option.id === selectedSize)?.preco}</p>
                        <button className="addBtn" onClick={() => adicionarAoCarrinho(group.options.find(option => option.id === selectedSize))}>Adicionar ao carrinho</button>
                      </div>
                    ))}
                </div>
            </div>
      
        <div className="shop-total">
          <hr className="hr1" />
          <h1>Total</h1>
          <p>Total do valor: R$ {totalValor.toFixed(2)}</p>
          <p>Total de produtos: {totalProdutos}</p>
          <hr />
          <p>
            {carrinho.map((item, index) => (
              <div className="total-produtos" key={index}>
                <p>{item.referencia} - {item.size} - Quantidade: {item.quantidade}</p>
                <button className="rmvBtn-total" onClick={() => removerDoCarrinho(index)}>X</button>
              </div>
            ))}
          </p>
        </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            <b>Total</b>
            <button style={{ border: "none", fontSize: 32, backgroundColor: "white"  }} onClick={handleClose}>X</button>
          </Typography>
          <div className="shop-total-mobile">
            <hr className="hr1" />
            <p>Total do valor: R$ {totalValor.toFixed(2)}</p>
            <p>Total de produtos: {totalProdutos}</p>
            <hr />
            <p>{carrinho.map((item, index) => (
              <div className="total-produtos" key={index}>
              <p>{item.referencia} - {item.size} - Quantidade: {item.quantidade}</p>
              <button className="rmvBtn-total" onClick={() => removerDoCarrinho(index)}>X</button>
              </div>
            ))}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Shop;
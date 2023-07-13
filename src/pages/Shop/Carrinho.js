import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import Tabs from "../../Components/Tabs-NewClients/TabNewClient";
import './Carrinho.css';
import { toast } from "react-toastify";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Header from '../../Header/Header';

// Renderizar carrinho em uma página separada
function CarrinhoSalvo() {

    // Recuperar carrinho do localstorage
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho'));

    const [carrinho, setCarrinho] = useState(carrinhoSalvo || []);
    const [discount, setDiscount] = useState(0);
    const [chave, setChave] = useState('');

    const [condPagamentoSelecionado, setCondPagamentoSelecionado] = useState('');
    const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState('');
    const [clientValue, setClientValue] = useState('');
    const [coments, setComents] = useState('');

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
        const carrinhoSalvoComProdutos = { produtos: novoCarrinho };
        localStorage.setItem("carrinho", JSON.stringify(carrinhoSalvoComProdutos));

        toast.error("Produto removido do carrinho", {autoClose: 500});
    }

    // Calcula o total de produtos
    const totalProdutos = carrinho.reduce((total, item) => {
        return total + item.quantidade;
    }, 0);

    // Calcula o total do carrinho
    const totalValor = carrinho.reduce((total, item) => {
        const preco = isNaN(item.preco) ? 0 : item.preco;
            return total + item.quantidade * preco;
    }, 0);

    // Calcula o total com desconto
    const totalComDesconto = carrinho.reduce((total, item) => {
        const preco = isNaN(item.price) ? 0 : item.price;
        return total + item.quantidade * preco;
    }, 0);

    // Salvar carrinho no localStorage
    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }, [carrinho]);

    //Gerar Pedido
    function gerarPedido() {

        // Obtenha os produtos do carrinho
        const produtos = carrinho.produtos ? carrinho.produtos : [];

        // Obtenha os valores dos inputs
        const nomeInput = document.getElementById('clientNome').value;
        const condPInput = document.getElementById('condPagamento').value;
        const formaPInput = document.getElementById('formaPagamento').value;
        const comentInput = document.getElementById('coments').value;
        const discountInput = document.getElementById('discountValue').value;

        // Crie um objeto com os dados do pedido, incluindo os valores dos inputs
        const pedido = {
            produtos: carrinho,
                client: nomeInput,
                condP: condPInput,
                formaP: formaPInput,
                coments: comentInput,
                discount: discountInput
        };
        
        // Obtenha o último ID gerado do localStorage
        const ultimoId = localStorage.getItem("ultimoId") || 0;
        const novoId = parseInt(ultimoId, 10) + 1;

        // Gera uma nova chave para o carrinho
        const novaChave = `id${ novoId } ${ uuidv4() }`;
        setChave(novaChave);

        // Salva os produtos no armazenamento local
        localStorage.setItem(novaChave, JSON.stringify(pedido));

        // Salva o novo ID no localStorage
        localStorage.setItem("ultimoId", novoId);

        // Redirecione para a página "Meus Orçamentos"
        window.location.href = "/meus-pedidos";

        localStorage.removeItem("carrinho");
      }

      //Aplicar Desconto
      function applyDiscount(e) {
        const discountValue = (e.target.value);

        setDiscount(discountValue);
        
        const discountedProducts = carrinho.map((product) => {
        const discountedPrice = product.preco * (1 - discountValue / 100);
            return {
                ...product,
                price: discountedPrice,
            };
        });
        setCarrinho(discountedProducts);
      }

    //Input list com Modal
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: 'background.paper',
        border: '2px solid #1e9ac7',
        boxShadow: 24,
        overflow: "scroll",
        p: 4,
    };

    const condPagamentos = [
        { label: 'À vista', value: 'À vista' },
        { label: '30', value: '30' },
        { label: '30/45', value: '30/45' },
        { label: '30/45/60', value: '30/45/60' },
        { label: '30/45/60/75', value: '30/45/60/75' },
        { label: "30/45/60/75/90", value: '30/45/60/75/90' },
        { label: '30/60', value: '30/60' },
        { label: '30/60/90', value: '30/60/90' },
    ];

    const formaDePagamento = [
        { label: "Pix", value: "Pix" },
        { label: "Boleto", value: "Boleto" },
        { label: "Cartão de crédito 1x", value: "Cartão de crédito 1x" },
        { label: "Cartão de crédito 2x", value: "Cartão de crédito 2x" },
        { label: "Cartão de crédito 3x", value: "Cartão de crédito 3x" }    
    ];

    const clientList = [
        { label: 'Teste', value: 'Teste1' }
    ];

    return (
        <div id="cart" className="cart">
            <Header />
            <h1>Carrinho</h1>
            <div className="items">
                {carrinho.map((item, index) => (
                <div className="cart-items" key={index}>
                    <img className="img-product" src={item.imagem} alt={item.nome} /> <br />
                    <div className='cart-items-p'>
                        <p>{item.nome} {item.size}</p>
                        <p><b>Ref.:</b> {item.referencia}</p>
                        <p><b>R$</b> {item.preco}</p>
                        <p><b>Quant.:</b> {item.quantidade}</p>
                    </div>
                    <br />
                    <button className="rmvBtn" onClick={() => removerDoCarrinho(index)}>Remover</button>
                </div>
                ))}
            </div>
            <hr className='hr1' />
            <div className="finalizar-carrinho">
                <div id="carrinho-total" className="carrinho-total">
                    <p><b>Total:</b> R${totalValor.toFixed(2)}</p>
                    <p><b>Total com desconto:</b> R${totalComDesconto.toFixed(2)}</p>
                    <p><b>Porcentagem de desconto aplicada: {discount}%</b></p>
                    <p><b>Total de produtos:</b> {totalProdutos}</p>
                    <p>Aplicar desconto: <input className="input-discount" id='discountValue' type="text" onChange={applyDiscount} placeholder="%" ></input></p>  
                </div>
                <hr />
                <div className="busca-cliente">
                    <form className="busca-cliente-form">
                        <tr>
                            <td className="clientes">
                                <span>
                                    <Autocomplete disablePortal id="clientNome" options={clientList} sx={{ display: "flex", marginTop: 3 }}
                                        renderInput={(params) => 
                                        <TextField {...params} label="Cliente" />
                                        } value={clientValue} onChange={(event, newValue) => {
                                            if (newValue === null) {
                                                setClientValue(null);
                                            } else {
                                                setClientValue(newValue.value);
                                            }
                                          }} />
                                </span>
                            </td>
                            <td className='addClient'>
                                <Button className='modal-button-client' style={{ backgroundColor: "#1e9ac7", height: "55px", marginBottom: "5px" }} variant="contained" onClick={handleOpen}><PersonAddIcon/></Button>
                                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                    <Box sx={style}>
                                    <div className='closeBtn'>
                                        <button className="closeBtn-modal" onClick={handleClose}>Fechar</button>
                                    </div>
                                    <div>
                                        <Tabs />
                                    </div>
                                    </Box>
                                </Modal>
                            </td>
                        </tr>
                        <div className='btn-payment'>
                                <span>
                                    <Autocomplete disablePortal id="condPagamento" options={condPagamentos} sx={{ display: "flex", marginTop: 3 }}
                                        renderInput={(params) => 
                                        <TextField {...params} label="Cond. de pagamento" />
                                        } value={condPagamentoSelecionado} onChange={(event, newValue) => {
                                            if (newValue === null) {
                                                setCondPagamentoSelecionado(null);
                                            } else {
                                                setCondPagamentoSelecionado(newValue.value);
                                            }
                                          }}
                                    />
                                </span>
                                <span>
                                    <Autocomplete disablePortal id="formaPagamento" options={formaDePagamento} sx={{ display: "flex", marginTop: 3 }}
                                        renderInput={(params) => 
                                        <TextField {...params} label="Forma de pagamento" />
                                        } value={formaPagamentoSelecionada} onChange={(event, newValue) => {
                                            if (newValue === null) {
                                                setFormaPagamentoSelecionada(null);
                                            } else {
                                                setFormaPagamentoSelecionada(newValue.value);
                                            }
                                          }}
                                    />
                                </span>
                            </div>
                    </form>
                </div>
            </div>

            <TextField
                id="coments"
                label="Comentários"
                multiline
                maxRows={4}
                sx={{ 
                    width: "100%",
                    marginTop: "20px",
                }}
                value={coments} onChange={(e) => setComents(e.target.value)}
            />

            <hr className='separador-mobile' />
                
            <div className="btns">
                <button  className="gerarPedido" onClick={gerarPedido}>Gerar Pedido</button>
            </div>
        </div>
    );
}

export default CarrinhoSalvo;
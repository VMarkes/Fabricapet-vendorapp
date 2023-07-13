import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cliente from "./pages/Clientes/Clients";
import NovoCliente from "./pages/newClient/newClient";
import Carrinho from "./pages/Shop/Carrinho";
import MeusPedidos from "./pages/Shop/meus-pedidos";
import { Fragment } from "react";
import useAuth from "../src/pages/hooks/useAuth";
import Signin from "../src/pages/Signin";
import Signup from "../src/pages/Signup";

const Private = ({ Item }) => {
    const { signed } = useAuth();
  
    return signed > 0 ? <Item /> : <Signin />;
  };

const Rotas = () => {
   return(
       <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/" element={<Signin />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route path="*" element={<Signin />} />
                    <Route path="/Home" element={<Private Item={Home} />} />
                    <Route path="/Shop" element={<Shop />} />
                    <Route path="/Clientes" element={<Cliente />} />
                    <Route path="/newClient" element={<NovoCliente />} />
                    <Route path="/meus-pedidos" element={<MeusPedidos />} />
                    <Route path="/Carrinho" element={<Carrinho />} />
                </Routes>
            </Fragment>
       </BrowserRouter>
   )
}

export default Rotas;
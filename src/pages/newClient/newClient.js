import React from "react";
import Tabs from "../../Components/Tabs-NewClients/TabNewClient";
import "./newClient.css";
import Header from "../../Header/Header";

function newClient() {
   
    return (
        <div className="clientRegister">
            <Header />
            <div className="new-client">
                <h1>Cadastrar Cliente</h1>
                    <Tabs />
            </div>
        </div>
    )
}

export default newClient;
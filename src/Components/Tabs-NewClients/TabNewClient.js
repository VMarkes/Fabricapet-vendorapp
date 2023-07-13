import React, { useState } from "react";
import "../Tabs-NewClients/TabNewClient.css";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";

const TabNewClient = () => {

  const [activeTab, setActiveTab] = useState("tab1");

  // Função trocar de abas
  const handleTab1 = () => {
    setActiveTab("tab1");
  };

  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  return (
    <div className="Tabs">
      <ul className="nav">
        <li
          className={activeTab === "tab1" ? "active" : ""}
          onClick={handleTab1}
        >
          Cadastro
        </li>
        <li
          className={activeTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
        >
          Endereço
        </li>
      </ul>
      <div className="outlet">
        {activeTab === "tab1" ? <FirstTab handleTab2={handleTab2} /> : <SecondTab />}
      </div>
    </div>
  );
};

export default TabNewClient;
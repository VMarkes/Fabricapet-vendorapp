import React, { useState, useEffect } from "react";
import "./FirstTab.css";
import InputMask from 'react-input-mask';

function FirstTab({ handleTab2 }) {

  useEffect(() => {
    
  }, []);

  const handleButton = () => {
    handleTab2();
  };

  return(
    <div className="cadastro">
      <form className="cadastro-form">
        <ul>
        <h2>Dados do cliente</h2>
          <li>
            <label><b>Nome Fantasia:</b></label>
            <input type="text" placeholder=" " />
          </li>
          <li>
            <label><b>Razão Social:</b></label>
            <input type="text"/>
          </li>
          <li>
            <label><b>CNPJ:</b></label>
            <InputMask type="text" mask="99.999.999/9999-99" maskChar=" " />
          </li>
          <li>
            <label><b>Insc. Estadual:</b></label>
            <input type="text"/>
          </li>
          <li>
            <label><b>E-mail:</b></label>
            <input type="text"/>
          </li>
          <li>
            <label><b>Telefone:</b></label>
            <InputMask type="text" mask="(99)9999-9999" maskChar=" " />
          </li>
          <li>
            <label><b>Celular:</b></label>
            <InputMask type="text" mask="(99)99999-9999" maskChar=" " />
          </li>
        <br />
        </ul>
        <button type="submit" onClick={handleButton}>Avançar</button>
      </form>
    </div>
  )
};

export default FirstTab;
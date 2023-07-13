import React from "react";
import { useForm } from 'react-hook-form';
import "./SecondTab.css";
import InputMask from 'react-input-mask';

const SecondTab = () => {
  const {register, setValue, setFocus} = useForm();

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      console.log(data);
      // register({ name: 'address', value: data.logradouro });
      setValue('address', data.logradouro);
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      setValue('uf', data.uf);
      setFocus('addressNumber');
    });
  }

  return (
    <div className="cadastro">
      <form className="adress-form">
        <ul>
          <h2>Endereço de Entrega</h2>
            <li>
              <label><b>CEP:</b></label>
              <InputMask type="text" {...register("address" )} onBlur={checkCEP}  mask="99999-999" maskChar=" " />
            </li>
            <li>
              <label><b>Rua:</b></label>
              <input type="text" {...register("address" )}/>
            </li>
            <li>
              <label><b>Número:</b></label>
              <input type="text" {...register("addressNumber" )}/>
            </li>
            <li>
              <label><b>Bairro:</b></label>
              <input type="text" {...register("neighborhood")}/>
            </li>
            <li>
              <label><b>Cidade:</b></label>
              <input type="text" {...register("city")}/>
            </li>
            <li>
              <label><b>Estado:</b></label>
              <input type="text" {...register("uf")}/>
            </li>
          <br />
        </ul>
      </form>
      <button type="submit">Enviar</button>
    </div>
  );
};
export default SecondTab;
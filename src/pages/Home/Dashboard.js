import React from "react";
import { useState } from "react";
import '../Home/Dashboard.css';

function Dashboard() {
  const [keys, setKeys] = useState([]);

  React.useEffect(() => {
    const chaves = Object.keys(localStorage);
    const regex = /^id\w{1} \w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/;
    const pedidosNoLocalStorage = chaves.filter(chave => regex.test(chave));

    setKeys(pedidosNoLocalStorage);
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Total de Pedidos: {keys.length}</p>
        <div className="sales-chart">
        </div>
    </div>
  );
}

export default Dashboard;
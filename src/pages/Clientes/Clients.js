import "./Clients.css";
import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import csvData from "../../Clients.csv";
import Grid from '@mui/material/Unstable_Grid2';

function Client() {

    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        // Faz a leitura do arquivo CSV e armazena os dados na variável de estado 'produtos'
        fetch(csvData)
          .then((response) => response.text())
          .then((data) => {
            const parsedData = data
            .split("\n")
            .slice(1) // remove a primeira linha (cabeçalho)
            .map((row) => row.split(";"))
            .map((row) => ({
              label: row[1],
              value: {
                id: row[0],
                nome: row[1],
                razaoSocial: row[2],
                cnpj: row[3],
                inscEstadual: row[4],
                email: row[5],
                telefone: row[6],
                celular: row[7],
                cep: row[8],
                rua: row[9],
                numero: row[10],
                bairro: row[11],
                cidade: row[12],
                estado: row[13],
              }
            }));
            parsedData.pop(); // remove o último item do array pois é um item vazio
            setClients(parsedData);
          });
      }, []);

      function handleEdit(client) {
        setSelectedClient(client);
      }

      function handleUpdate(updatedClient) {
        // Atualize os dados do cliente no 'clients' array
        const updatedClients = clients.map((client) => {
          if (client.id === updatedClient.id) {
            return updatedClient;
          }
          return client;
        });
      
        // Converta os dados atualizados em formato CSV
        const updatedCsvData = updatedClients
          .map((client) => Object.values(client).join(";"))
          .join("\n");
      
        // Atualize o arquivo CSV localmente
        const fileReader = new FileReader();
        fileReader.onloadend = function () {
            const csvDataUrl = fileReader.result;
            const downloadLink = document.createElement("a");
            downloadLink.href = csvDataUrl;
            downloadLink.setAttribute("download", "Clients.csv");
            downloadLink.click();
        };
        const blob = new Blob([updatedCsvData], { type: "text/csv" });
        fileReader.readAsDataURL(blob);

        // Atualize o estado dos clientes
        setClients(updatedClients);
        alert("Dados atualizados com sucesso!");

      }

      let editForm = null;

      if (selectedClient) {
        editForm = (
          <div className="edit-form">
            <h2>Editar Cliente</h2>
            {/* Componentes do formulário de edição */}
            <label>Nome:</label>
            <input type="text" value={selectedClient.nome} onChange={(e) => setSelectedClient({ ...selectedClient, nome: e.target.value })} />
    
            <label>Razão Social:</label>
            <input type="text" value={selectedClient.razaoSocial} onChange={(e) => setSelectedClient({ ...selectedClient, razaoSocial: e.target.value })} />
    
            <label>CNPJ:</label>
            <input type="text" value={selectedClient.cnpj} onChange={(e) => setSelectedClient({ ...selectedClient, cnpj: e.target.value })} />
            
            <label>Cidade:</label>
            <input type="text" value={selectedClient.cidade} onChange={(e) => setSelectedClient({ ...selectedClient, cidade: e.target.value })} />

            <label>Estado:</label>
            <input type="text" value={selectedClient.estado} onChange={(e) => setSelectedClient({ ...selectedClient, estado: e.target.value })} />
    
            <button onClick={() => handleUpdate(selectedClient)}>Salvar</button>
          </div>
        );
      }
   
    return (
        <div className="client">
            <Header />
            <div className="client-content">
                <h1>Clientes</h1>
                {clients.map((client) => (
                    <div className="clients" key={client.id}>
                        <Grid className="grid" container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                           <p><b>Nome:</b> {client.nome}</p>
                           <p><b>Razão Social:</b> {client.razaoSocial}</p>
                           <p><b>CNPJ:</b> {client.cnpj}</p>
                           <p><b>Cidade:</b> {client.cidade}</p>
                           <p><b>Estado:</b> {client.estado}</p>
                           <button onClick={() => handleEdit(client)}>Editar</button>
                        </Grid>
                    </div>
                ))}
            </div>
            {/* Renderização do formulário de edição */}
            {editForm}
        </div>
    )
}

export default Client;
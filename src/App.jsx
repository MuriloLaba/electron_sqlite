import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-tailwind/react';

function App() {
  const [data, setData] = useState(''); // Inicializa o estado com uma string vazia

  useEffect(() => {
    window.api.receive('createKartResponse', (response) => {
      if (response.success) {
        console.log('Kart criado com ID:', response.kartId);
      } else {
        console.error('Erro ao criar kart:', response.message);
      }
    });

    // Limpeza do ouvinte
    return () => {
      window.api.clear('createKartResponse');
    };
  }, []); // Dependências vazias significam que isso acontecerá no montar e desmontar

  // Em App.jsx ou onde o botão é definido

  function handleClick() {
    const novoKart = {
      modelo: 'Modelo X',
      ano: 2020,
      pneu: 1,
      gasolina: 1,
      status: 1,
      descricao: 'Descrição do kart'
    };

    window.api.send('createKart', novoKart);
  }


  return (
    <div className="flex w-screen h-screen bg-black justify-center items-center">
      <div>
        <Button variant="filled" color='amber' onClick={handleClick}>Enviar</Button>
      </div>
      <div>
        <Typography color='white'>Dados recebidos do backend: {data}</Typography>
      </div>
    </div>
  );
}

export default App;

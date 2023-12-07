import React, { useState } from 'react';
import axios from 'axios';

const IPTVLinkParser = () => {
  const [m3uLink, setM3ULink] = useState('');
  const [sito, setSito] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');

  const handleParse = async () => {
    // Implementa la logica di parsing qui
    // Estrai sito, username, password, e output da m3uLink
    // Esempio di URL M3U: http://example.com/get.php?username=yourUsername&password=yourPassword&type=m3u_plus&output=mpegts

    const url = new URL(m3uLink);
    const sitoValue = url.origin;
    const usernameValue = url.searchParams.get('username') || '';
    const passwordValue = url.searchParams.get('password') || '';
    const outputValue = url.searchParams.get('output') || '';
  
    

    setSito(sitoValue);
    setUsername(usernameValue);
    setPassword(passwordValue);
    setOutput(outputValue);

    console.log('Sito:', sito);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Output:', output);

    // Ricrea il link M3U completo
    const reconstructedM3U = `${sito}/get.php?username=${username}&password=${password}&type=m3u_plus&output=${output}`;
    console.log('Link M3U completo:', reconstructedM3U);

    // Esegui il fetch del link M3U completo
    try {
      const response = await axios.get(reconstructedM3U);
      const data = response.data;
      console.log('Dati del M3U:', data);

      // Ora puoi eseguire ulteriori operazioni con i dati M3U se necessario
    } catch (error) {
      console.error('Errore durante il fetch del file M3U', error);
    }
  };

  return (
    <div>
      <label>
        Inserisci il link M3U:
        <input type="text" value={m3uLink} onChange={(e) => setM3ULink(e.target.value)} />
      </label>

      <button onClick={handleParse}>
        Recupera Canali
      </button>
    </div>
  );
};

export default IPTVLinkParser;


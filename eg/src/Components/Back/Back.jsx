import ServiceCrud from './Autoservisas/Crud';
import MasterCrud from './Master/Crud';
import Nav from './Nav';
import BackContext from './BackContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { authConfig } from '../../Functions/auth';

function Back({ show }) {

  const [createCat, setCreateCat] = useState(null);

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Create
  // useEffect Funkcija, kuri nurodys, ką paleisti pasikeitus būsenai

  useEffect(() => {
    if (null === createCat) return;
    axios.post('http://localhost:3003/admin/service', createCat)
      .then(res => {
        setLastUpdate(Date.now());
      })
  }, [createCat]);



  return (
    <BackContext.Provider value={{
      setCreateCat,
      // cats
    }}>
      {
        show === 'admin' ?
          <>
            <Nav />
            <h1>Admin page</h1>
          </>
          : show === 'service' ? < ServiceCrud /> :
            show === 'master' ? <MasterCrud /> : null
      }
    </BackContext.Provider>
  )
}
export default Back;
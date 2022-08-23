import ServiceCrud from './Autoservisas/Crud';
import MasterCrud from './Master/Crud';
import Nav from './Nav';
import BackContext from './BackContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { authConfig } from '../Functions/auth';

function Back({ show }) {
  const [cats, setCats] = useState(null);  //cats atiduodam provaideriui 

  const [createCat, setCreateCat] = useState(null); //setCreateCat atiduodam provaideriui 
  const [deleteCat, setDeleteCat] = useState(null); //setDeleteCat

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Read cat
  useEffect(() => {
    axios.get('http://localhost:3003/admin/service', authConfig())
      .then(res => setCats(res.data));
  }, [lastUpdate]);


  // Create cat
  // useEffect Funkcija, kuri nurodys, ką paleisti pasikeitus būsenai

  useEffect(() => {
    if (null === createCat) return;
    axios.post('http://localhost:3003/admin/service', createCat, authConfig())
      .then(res => {
        setLastUpdate(Date.now());
      })
  }, [createCat]);

  // Delete cat
  useEffect(() => {
    if (null === deleteCat) return; //Pasikeitus deleteCat, jei jis ne 0, siunciame to cato id i admin cat
    axios.delete('http://localhost:3003/admin/service/' + deleteCat.id, authConfig()) //deleteCat.id: siunciam cat id, o ne katina, todel +, o ne kablelis
      .then(res => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch(error => {
        showMessage({ text: error.message, type: 'danger' }); //Jei ateina klaida, rodo sita zinute
      })
  }, [deleteCat]);

  const showMessage = () => {
  }

  return (
    <BackContext.Provider value={{
      setCreateCat,
      cats,
      setDeleteCat
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
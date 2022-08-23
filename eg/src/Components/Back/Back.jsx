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
  const [editCat, setEditCat] = useState(null);     //setEditCat atiduodam provaideriui
  const [modalCat, setModalCat] = useState(null);   //setModalCat ir modalCat - atvaizduos modala

  const [masters, setMasters] = useState(null); //masters > pr
  const [createMaster, setCreateMaster] = useState(null); //setCreateMaster i provider, createMaster i useEffect
  const [deleteMaster, setDeleteMaster] = useState(null); //setDeleteMaster i provider, deleteMaster i useEffect
  const [editMaster, setEditMaster] = useState(null);     //setEditMaster > provider,
  const [modalMaster, setModalMaster] = useState(null);   //modalMaster ir setModalMaster > provider
  const [deletePhoto, setDeletePhoto] = useState(null); //setDeletePhoto i provider, deletePhoto i useEffect

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Read service
  useEffect(() => {
    axios.get('http://localhost:3003/admin/service', authConfig())
      .then(res => setCats(res.data));
  }, [lastUpdate]);


  // Create service
  // useEffect Funkcija, kuri nurodys, ką paleisti pasikeitus būsenai

  useEffect(() => {
    if (null === createCat) return;
    axios.post('http://localhost:3003/admin/service', createCat, authConfig())
      .then(res => {
        setLastUpdate(Date.now());
      })
  }, [createCat]);

  // Delete service
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

  // Edit info service
  useEffect(() => {
    if (null === editCat) return; /* editCat (is virsau) –  tai viena kategorija, kurioje yra id ir title */
    axios.put('http://localhost:3003/admin/service/' + editCat.id, editCat, authConfig()) /* editCat – perdavinesim title */
      .then(res => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch(error => {
        showMessage({ text: error.message, type: 'danger' });
      })
  }, [editCat]);

  // Create master
  useEffect(() => {
    if (null === createMaster) return;
    axios.post('http://localhost:3003/admin/master', createMaster, authConfig())
      .then(res => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch(error => {
        showMessage({ text: error.message, type: 'danger' });
      })
  }, [createMaster]);

  // Read master
  useEffect(() => {
    axios.get('http://localhost:3003/admin/master', authConfig())
      .then(res => setMasters(res.data));
  }, [lastUpdate]);

  // Delete master
  //trinam pagal master id - deleteMaster.id
  useEffect(() => {
    if (null === deleteMaster) return;
    axios.delete('http://localhost:3003/admin/master/' + deleteMaster.id, authConfig())
      .then(res => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch(error => {
        showMessage({ text: error.message, type: 'danger' });
      })
  }, [deleteMaster]);

  // Edit Master
  useEffect(() => {
    if (null === editMaster) return;
    axios.put('http://localhost:3003/admin/master/' + editMaster.id, editMaster, authConfig())
      .then(res => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch(error => {
        showMessage({ text: error.message, type: 'danger' });
      })
  }, [editMaster]);

  // delete Photo
  useEffect(() => {
    if (null === deletePhoto) return;
    axios.delete('http://localhost:3003/admin/photos/' + deletePhoto.id, authConfig())
      .then(res => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch(error => {
        showMessage({ text: error.message, type: 'danger' });
      })
  }, [deletePhoto]);

  const showMessage = () => {
  }

  return (
    <BackContext.Provider value={{
      setCreateCat,
      cats,
      setDeleteCat,
      setEditCat,
      setModalCat,
      modalCat,  /* atvaizduos modala */
      setCreateMaster,
      masters,
      setDeleteMaster, //i line perduodam
      setEditMaster,
      setModalMaster,
      modalMaster,
      setDeletePhoto
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
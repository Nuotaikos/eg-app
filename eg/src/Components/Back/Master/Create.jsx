import { useContext, useRef, useState } from 'react';
import getBase64 from '../../Functions/getBase64';
import BackContext from '../BackContext';

function Create() {

  const { cats, setCreateMaster } = useContext(BackContext); //setCreateMaster atiduodam  i provideri esanti  Back.jsx

  const [name_surname, setName_surname] = useState('');
  const [spec, setSpec] = useState('');
  const [city, setCity] = useState('');
  const [cat, setCat] = useState('0');
  const fileInput = useRef();

  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then(photo => setPhotoPrint(photo))
      .catch(_ => {
        // tylim
      })
  }

  const handleCreate = () => {  //kontroliuosim ivedimo laukelius
    // if (cat === '0') {
    // showMessage({ text: 'Please, select cat!', type: 'danger' });
    // return;
    // }

    const data = {
      name_surname,
      spec,
      city,
      cat: parseInt(cat),
      photo: photoPrint,
    };
    setCreateMaster(data);         // paimam is const ir pasetinam
    setName_surname('');               //kai uzpildysim lentele ji nunulins i tuscius laukelius
    setSpec('');
    setCity('');
    setCat('0');
    setPhotoPrint(null);
    fileInput.current.value = null;
  }

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Create new Master</h2>
      </div>
      <div className="card-body">
        <div className="form-group ">
          <label>Name surname</label>
          <input type="text" className="form-control" onChange={e => setName_surname(e.target.value)} value={name_surname} />
          <small className="form-text text-muted">Name and surname.</small>
        </div>
        <div className="form-group">
          <label>Specialization</label>
          <input type="text" className="form-control" onChange={e => setSpec(e.target.value)} value={spec} />
          <small className="form-text text-muted">Enter specialization.</small>
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" className="form-control" onChange={e => setCity(e.target.value)} value={city} />
          <small className="form-text text-muted">Enter city.</small>
        </div>
        <div className="form-group">
          <label>Categories</label>
          <select className="form-control" onChange={e => setCat(e.target.value)} value={cat}>
            <option value="0">Please, select your service</option>
            {
              cats ? cats.map(c => <option key={c.id} value={c.id}>{c.title}</option>) : null
            }
          </select>
          <small className="form-text text-muted">Select service here.</small>
        </div>
        <div className="card-body ">
          <div className="form-group">
            <label>Photo</label>
            <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
            <small className="form-text text-muted">Upload Photo.</small>
          </div>
          {
            photoPrint ? <div className="photo-bin"><img src={photoPrint} alt="nice" /></div> : null
          }
          <button type="button" className="btn btn-outline-primary mt-4" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default Create;
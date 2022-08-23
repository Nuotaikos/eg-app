import { useEffect, useState, useContext, useRef } from "react";
import BackContext from "../BackContext";
import getBase64 from '../../Functions/getBase64';

function Edit() {

  const { modalMaster, setEditMaster, setModalMaster, cats, setDeletePhoto } = useContext(BackContext); //setModalMaster atiduodam i line


  const [name_surname, setName_surname] = useState('');
  const [spec, setSpec] = useState('');
  const [city, setCity] = useState('');
  const [cat, setCat] = useState('0');
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();


  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then(photo => setPhotoPrint(photo))
      .catch(_ => {
        // tylim
      })
  }

  const handleDeletePhoto = () => {
    setDeletePhoto({ id: modalMaster.id });
    setModalMaster(p => ({ ...p, photo: null }));
  }


  useEffect(() => {
    if (null === modalMaster) {
      return;
    }
    setName_surname(modalMaster.name_surname);
    setSpec(modalMaster.spec);
    setCity(modalMaster.city);
    setCat(cats.filter(c => c.title === modalMaster.cat)[0].id);
    setPhotoPrint(modalMaster.photo);
  }, [modalMaster, cats]);

  const handleEdit = () => {
    const data = {  //atiduodam į DB
      id: modalMaster.id,
      name_surname,
      spec,
      city,
      cat: parseInt(cat),
      photo: photoPrint
    };
    setEditMaster(data);
    setModalMaster(null);
  }


  if (null === modalMaster) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Master Changer</h5>
            <button type="button" className="close" onClick={() => setModalMaster(null)}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
              <label>Master</label>
              <select className="form-control" onChange={e => setCat(e.target.value)} value={cat}>
                <option value="0">Please, select your Master</option>
                {
                  cats ? cats.map(c => <option key={c.id} value={c.id}>{c.title}</option>) : null
                }
              </select>
              <small className="form-text text-muted">Select Book here</small>
            </div>
            <div className="card-body ">
              <div className="form-group">
                <label>Photo</label>
                <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                <small className="form-text text-muted">Change Photo</small>
              </div>
              {
                photoPrint ? <div className="photo-bin"><img src={photoPrint} alt="nice" /></div> : null
              }
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setModalMaster(null)}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleEdit}>Save changes</button>
            <button type="button" className="btn btn-outline-danger" onClick={handleDeletePhoto}>Remove Photo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
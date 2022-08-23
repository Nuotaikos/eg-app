import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {

  const { setCreateCat } = useContext(BackContext); //setCreateCat atiduodam  i provideri esanti  Back.jsx

  const [title, setTitle] = useState('');

  const handleCreate = () => {  //kontroliuosim ivedimo laukelius
    const data = { title, /*jeji reikia irasom visa kita*/ };
    setCreateCat(data);         // paimam is const ir pasetinam
    setTitle('');               //kai uzpildysim lentele ji nunulins i tuscius laukelius
  }

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Create new Service</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
          <small className="form-text text-muted">Enter your service name here.</small>
        </div>
        <button type="button" className="btn btn-outline-primary mt-4" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default Create;
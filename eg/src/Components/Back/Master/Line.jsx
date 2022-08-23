import { useContext } from 'react';
import BackContext from '../BackContext';

function Line({ line }) { //paima ({ line }) ir returne is line atspausdinam title, price ir t.t.

  const { setDeleteMaster, setModalMaster } = useContext(BackContext);

  const handleDelete = () => { //Paspaudus ant mygtuko delete pasileis handleDelete funkcija > pasetins I cat(line), o line yra id ir title
    setDeleteMaster(line);
  }

  const handleEdit = () => {
    setModalMaster(line); /* mygtukas, kuris iskviecia modala */
  }

  return (
    <div className="container text-center">
      <div className="table-wrapper">
        <table className="table table-striped table-hover">
          <thead className='table-dark'>
            <tr>
              <th className="w-25 fs-5" scope="col">Photo</th>
              <th className="fs-5" scope="col">Name</th>
              <th className="fs-5" scope="col">Specialization</th>
              <th className="fs-5" scope="col">City</th>
              <th className="fs-5" scope="col">Service</th>
              <th className="fs-5" scope="col"></th>
              <th className="fs-5" scope="col"></th>
            </tr>
          </thead>
          <tbody className="body-text">
            <tr>
              <td>
                {
                  line.photo ? <div className="photo-bin"><img src={line.photo} alt={line.title} /></div> : null
                }
              </td>
              <td>{line.name_surname}</td>
              <td>{line.spec}</td>
              <td>{line.city}</td>
              <td className="cat">{line.cat}</td>
              <td className="form-group">
                <button type="button" className="btn btn-primary ml-2" onClick={handleEdit}>Edit</button>
              </td>
              <td className="form-group">
                <button type="button" className="btn btn-secondary ml-2" onClick={handleDelete}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Line;
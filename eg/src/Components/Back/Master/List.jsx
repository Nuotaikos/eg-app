import { useContext } from 'react';
import Line from './Line';
import BackContext from '../BackContext';

function List() {

  const { masters } = useContext(BackContext); //kategorijos is BackContext. Kategorijas paimam is serverio ir atiduodam i konteksta


  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>List of Masters</h2>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {
            masters ? masters.map(p => <Line key={p.id} line={p}></Line>) : null /**/
          }
        </ul>
      </div>
    </div>
  );
}

export default List;

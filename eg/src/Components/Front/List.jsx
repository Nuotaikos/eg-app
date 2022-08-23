// import { useContext } from 'react';
// import Line from './Line';
// import FrontContext from './FrontContext';


// function List() {

//   const { masters } = useContext(FrontContext);  //kategorijos is FrontContext. Kategorijas paimam is serverio ir atiduodam i konteksta

//   return (
//     <div className="card mt-4">
//       <div className="card-header">
//         <h2>List of masters</h2>
//       </div>
//       <div className="card-body">
//         <ul className="list-group">
//           {
//             masters ? masters.map(b => <Line key={b.id} line={b}></Line>) : null
//             /*Liste paimam masters ir ismepinam I line paduodami masters*/
//           }
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default List;
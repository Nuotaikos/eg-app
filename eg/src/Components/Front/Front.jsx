// import axios from "axios";
// import { useEffect } from "react";
// import { authConfig } from "../Functions/auth";
// import FrontContext from "./FrontContext";
// import List from "./List";
// import Nav from "./Nav";

// function Front() {

//   const [masters, setMasdters] = useState(null);

//   // Read Products
//   useEffect(() => {
//     axios.get('http://localhost:3003/master', authConfig())
//       .then(res => setMasdters(res.data));
//   }, []);

//   return (
//     <FrontContext.Provider value={{
//       masters
//     }}>
//       <Nav />
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//           </div>
//           <div className="col-12">
//             <List />
//           </div>
//         </div>
//       </div>
//     </FrontContext.Provider>
//   );
// }



// export default Front;

function Front() {
  return (
    <h1>Front</h1>
  );
}

export default Front;
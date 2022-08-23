import Nav from "../Nav";
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";

function Crud() {
  return (

    <>
      <Nav></Nav>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Create />
          </div>
          <div className="col-8">
            <List></List>
          </div>
        </div>
      </div>
      <Edit></Edit>
    </>
  );
}

export default Crud;
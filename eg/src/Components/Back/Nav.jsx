import { NavLink } from "react-router-dom";

function Nav() {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">CAR service</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="/admin/" className="nav-link active" href="#">Admin
                  <span className="visually-hidden">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/service" className="nav-link" href="#">Service</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/master" className="nav-link" href="#">Master</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link" href="#">Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav; 
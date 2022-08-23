import ServiceCrud from './Service/Crud';
import MasterCrud from './Master/Crud';
import Nav from './Nav';

function Back({ show }) {

  if (show === 'admin') {
    return (
      <>
        <Nav></Nav>
        <h1>Admin page</h1>
      </>
    )
  }
  if (show === 'service') {
    return (
      <ServiceCrud />
    )
  }
  if (show === 'master') {
    return (
      <MasterCrud />
    )
  }
}
export default Back;
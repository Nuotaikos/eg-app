import ServiceCrud from './Service/Crud';
import MasterCrud from './Master/Crud';

function Back({ show }) {

  if (show === 'admin') {
    return (
      <h1>BACK</h1>
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
import { Alert } from 'react-bootstrap'

const Notification = ({ notif }) => {
  if (notif === null) {
    return null
  }
  return <Alert variant={notif.status}>
    {notif.message}
  </Alert>
}

export default Notification
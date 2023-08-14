const Notification = ({ notif }) => {
  if (notif === null) {
    return null
  }
  return <div className={notif.status}>{notif.message}</div>
}

export default Notification
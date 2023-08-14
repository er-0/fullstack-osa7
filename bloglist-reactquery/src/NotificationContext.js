import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'TEXT':
    return action.payload
  case 'RESET':
    return null
  default:
    return state
  }
}
const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notif, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notif, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
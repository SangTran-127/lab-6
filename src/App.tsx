import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from './hooks';
import { NotificationSliceState, success } from './store/slice/notification.slice';
import { RootState } from './store';
import { showToast } from './utils/tool';
import Header from './components/Header';
import PrivateRoute from './hoc/PrivateRoute';
import Routes from './Routes';
function App() {
  const dispatch = useAppDispatch()
  const notification = useAppSelector(state => state.notification)
  useEffect(() => {


    if (notification && notification.error) {
      const msg = notification.message ? notification.message : 'Error'
      showToast('error', msg)

    }
    if (notification && notification.success) {

      const msg = notification.message ? notification.message : 'Good job !!!'
      showToast('success', msg)

    }
  }, [dispatch, notification])
  return (
    <>
      <Routes />
    </>

  )

}

export default App

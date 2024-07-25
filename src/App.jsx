
import { Route, Routes } from 'react-router-dom'
import './App.css'
import OtpForm from './pages/OtpForm'
import CourseList from './pages/Course-List'
import Batches from './pages/batches'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function App() {
  const nav = useNavigate()
  useEffect(()=>{
    nav('/otp-form')
  })

  return (
    <Routes>
        <Route path='/otp-form' element={<OtpForm />}/>
        <Route path='/course-list' element={<CourseList />} />
        <Route path='/batches' element={<Batches />}/>
    </Routes>
  )
}

export default App

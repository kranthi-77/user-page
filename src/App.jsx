import Header from "./components/Header"
import Home from "./components/Home"
import UserDetail from "./components/UserDetail"

import  { Routes, Route } from "react-router-dom"
import { DarkModeProvider } from "./store/DarkModeContext"
import { UserProvider } from "./store/UserContext"
import './App.css'

const App = ()=>{
  return(
    <div id='root'>
    <DarkModeProvider>
    <UserProvider>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </UserProvider>
    </DarkModeProvider>
    </div>
  )
}


export default App
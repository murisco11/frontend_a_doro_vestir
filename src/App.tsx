import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ClientList from './Components/ClientList'
import ClientPost from './Components/ClientPost'
import ClientEdit from './Components/ClientEdit'
import ClientView from './Components/ClientView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ClientList />} />
        <Route path='/post' element={<ClientPost />} />
        <Route path='/edit/:id' element={<ClientEdit />} />
        <Route path='/view/:id' element={<ClientView />} />
      </Routes>
    </Router>
  )
}

export default App

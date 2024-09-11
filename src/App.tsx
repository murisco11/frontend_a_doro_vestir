import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ClientList from './Components/ClientList'
import ClientPost from './Components/ClientPost'
import ClientEdit from './Components/ClientEdit'
import ClientView from './Components/ClientView'
import Pin from './Components/Pin'
import TransactionEdit from './Components/TransactionEdit'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ClientList />} />
        <Route path='/pin' element={<Pin />} />
        <Route path='/post' element={<ClientPost />} />
        <Route path='/edit/:id' element={<ClientEdit />} />
        <Route path='/view/:id' element={<ClientView />} />
        <Route path='/transaction/edit/:id' element={<TransactionEdit />} />
      </Routes>
    </Router>
  )
}

export default App

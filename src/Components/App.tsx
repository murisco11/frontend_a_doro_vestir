import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ClientList from './ClientList.tsx'
import ClientPost from './ClientPost.tsx'
import ClientEdit from './ClientEdit.tsx'
import ClientView from './ClientView.tsx'

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

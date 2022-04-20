import React from 'react'
import {
    BrowserRouter, 
    Routes, 
    Route,
} from 'react-router-dom'
import { App } from '../App'
import { CreateForm, EditForm } from '../components'

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/user/create' element={<CreateForm />} />
            <Route path='/user/:id/edit' element={<EditForm />} />
        </Routes>
    </BrowserRouter>
  )
}

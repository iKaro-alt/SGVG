import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axiosInstance from 'services/axios';

import Cadastro from './pages/Cadastro';
import Home from './pages/Home';

let token = JSON.parse(localStorage.getItem('token'));

export default function Router() {

  function hasJWT() {
    let flag = false;

    //Checa a existência do JWT token
    localStorage.getItem('token') ? (flag = true) : (flag = false);

    return flag;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={
		hasJWT() 
		? <Route path="/cadastro" element={<Cadastro/>}/> 
		: <Navigate to="/" />		
		}
	  />
        
      </Routes>
    </BrowserRouter>
  );
}

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../src/pages/home/index";
import Login from "../src/pages/Login";
import Cadastro from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import Historico from "../src/pages/Historico";
import Irrigacao from "./pages/Irrigacao";
import Alertas from "./pages/Alertas";
import Evolucao from "./pages/Evolucao";
import Configuracoes from "./pages/Configuracoes";


export default function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Cadastro />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/irrigacao" element={<Irrigacao />}/>
            <Route path="/alertas" element={<Alertas />}/>
            <Route path="/evolucao" element={<Evolucao />}/>
            <Route path="/historico" element={<Historico />}/>
            <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
        </BrowserRouter>
    );
}
// resources/js/app.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListProdutos from './components/Produtos/ListProdutos';
import CreateProduto from './components/Produtos/CreateProduto';
import EditProduto from './components/Produtos/EditProduto';
import ShowProduto from './components/Produtos/ShowProduto';

import '../css/app.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz redireciona para /produtos */}
        <Route path="/" element={<Navigate to="/produtos" replace />} />

        {/* Lista todos */}
        <Route path="/produtos" element={<ListProdutos />} />

        {/* Criar novo */}
        <Route path="/produtos/novo" element={<CreateProduto />} />

        {/* Editar existente, parâmetro :id */}
        <Route path="/produtos/:id/editar" element={<EditProduto />} />

        {/* Mostrar detalhes */}
        <Route path="/produtos/:id" element={<ShowProduto />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

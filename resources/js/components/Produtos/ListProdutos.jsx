import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../bootstrap';

export default function ListProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/produtos');
      setProdutos(response.data.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir este produto?')) return;
    try {
      await axios.delete(`/api/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>
      <Link
        to="/produtos/novo"
        className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + Novo Produto
      </Link>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nome</th>
              <th className="border px-4 py-2">Categoria</th>
              <th className="border px-4 py-2">Quantidade</th>
              <th className="border px-4 py-2">Descrição</th>
              <th className="border px-4 py-2">Preço</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td className="border px-4 py-2">{produto.id}</td>
                <td className="border px-4 py-2">{produto.nome}</td>
                <td className="border px-4 py-2">{produto.categoria}</td>
                <td className="border px-4 py-2">{produto.quantidade}</td>
                <td className="border px-4 py-2">
                  {produto.descricao || '—'}
                </td>
                <td className="border px-4 py-2">R$ {produto.preco.toFixed(2)}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/produtos/${produto.id}`)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => navigate(`/produtos/${produto.id}/editar`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(produto.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


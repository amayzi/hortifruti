import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../bootstrap';

export default function ShowProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProduto = async () => {
    try {
      const response = await axios.get(`/api/produtos/${id}`);
      setProduto(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduto();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Produto</h1>
      <p><strong>ID:</strong> {produto.id}</p>
      <p><strong>Nome:</strong> {produto.nome}</p>
      <p><strong>Categoria:</strong> {produto.categoria}</p>
      <p><strong>Quantidade:</strong> {produto.quantidade}</p>
      <p><strong>Descrição:</strong> {produto.descricao || '—'}</p>
      <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
      <p><strong>Data de Validade:</strong> {produto.data_validade || '—'}</p>
      <p><strong>Data de Entrada:</strong> {produto.data_entrada || '—'}</p>

      <button
        onClick={() => navigate('/produtos')}
        className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        Voltar
      </button>
    </div>
  );
}

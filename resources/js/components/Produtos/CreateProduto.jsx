import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../bootstrap';

export default function CreateProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await axios.post('/api/produtos', {
        nome,
        descricao: descricao || null,
        categoria,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
        data_validade: dataValidade || null,
        data_entrada: dataEntrada || null,
      });
      navigate('/produtos');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        console.error('Erro ao cadastrar produto:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nome</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          {errors.nome && (
            <p className="text-red-600 text-sm">{errors.nome[0]}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Descrição</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          {errors.descricao && (
            <p className="text-red-600 text-sm">{errors.descricao[0]}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Categoria</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
          {errors.categoria && (
            <p className="text-red-600 text-sm">{errors.categoria[0]}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Quantidade</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            min="0"
            required
          />
          {errors.quantidade && (
            <p className="text-red-600 text-sm">{errors.quantidade[0]}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Preço (em R$)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border px-3 py-2 rounded"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
          {errors.preco && (
            <p className="text-red-600 text-sm">{errors.preco[0]}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Data de Validade</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={dataValidade}
            onChange={(e) => setDataValidade(e.target.value)}
          />
          {errors.data_validade && (
            <p className="text-red-600 text-sm">{errors.data_validade[0]}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Data de Entrada</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={dataEntrada}
            onChange={(e) => setDataEntrada(e.target.value)}
          />
          {errors.data_entrada && (
            <p className="text-red-600 text-sm">{errors.data_entrada[0]}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => navigate('/produtos')}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

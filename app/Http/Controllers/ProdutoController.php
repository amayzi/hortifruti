<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    // Exibir todos os produtos
    public function index()
    {
        return Produto::all();
    }

    // Salvar um novo produto
    public function store(Request $request)
    {
        return Produto::create($request->all());
    }

    // Exibir um produto específico
    public function show(string $id)
    {
        return Produto::findOrFail($id);
    }

    // Atualizar um produto
    public function update(Request $request, string $id)
    {
        $produto = Produto::findOrFail($id);
        $produto->update($request->all());
        return $produto;
    }

    // Excluir um produto
    public function destroy(string $id)
    {
        Produto::destroy($id);
        return response()->noContent();
    }
}

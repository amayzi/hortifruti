<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model{
    protected $fillable = [
    'nome',
    'descricao',
    'categoria',
    'preco',
    'quantidade',
    'data_validade',
    'data_entrada',
    ];
}

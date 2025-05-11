'use client';

import React, { useState } from 'react';
import AddValor from './components/AddValor';

type Transacao = {
  valor: number;
  descricao: string;
  categoria: string | null; 
};

const categoriasFixas = ['alimentação', 'transporte', 'saúde', 'lazer', 'contas'];

const Home = () => {
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  const adicionarTransacao = (
    valor: number,
    descricao: string,
    categoria: string | null,  
    tipo: 'entrada' | 'saida'
  ) => {
    const valorCorrigido = tipo === 'saida' ? -Math.abs(valor) : Math.abs(valor);

    setTransacoes((prev) => [...prev, { valor: valorCorrigido, descricao, categoria }]);

    if (tipo === 'entrada') {
      setEntradas((e) => e + valorCorrigido);
    } else {
      setSaidas((s) => s + valorCorrigido);
    }
  };

  const balanco = entradas + saidas;

  const totaisPorCategoria: Record<string, number> = {};
  transacoes.forEach((t) => {
    if (t.valor < 0 && t.categoria) {  
      totaisPorCategoria[t.categoria] = (totaisPorCategoria[t.categoria] || 0) + Math.abs(t.valor);
    }
  });

  return (
    <main className="Container">
      <header>
        <h1>Finanças</h1>
      </header>

      <div className="Topo-Explicativo">
        <div className="Entradas">
          <div className="titulo">
            <h2>Entradas</h2>
            <AddValor
              tipo="entrada"
              onAdicionar={(valor, descricao, categoria) =>
                adicionarTransacao(valor, descricao, categoria, 'entrada')
              }
            />
            <p className="valor">R$ {entradas.toFixed(2)}</p>
            <p className="descricao">Somada todas as entradas do período.</p>
          </div>
        </div>

        <div className="Saidas">
          <div className="titulo">
            <h2>Saídas</h2>
            <AddValor
              tipo="saida"
              onAdicionar={(valor, descricao, categoria) =>
                adicionarTransacao(valor, descricao, categoria, 'saida')
              }
            />
            <p className="valor">R$ {Math.abs(saidas).toFixed(2)}</p>
            <p className="descricao">Somada todas as saídas do período.</p>
          </div>
        </div>

        <div className="Balanco">
          <div className="titulo">
            <h2>Balanço</h2>
            <p className={`valor ${balanco < 0 ? 'negativo' : 'positivo'}`}>R$ {balanco.toFixed(2)}</p>
            <p className="descricao">Somada todas as entradas e saídas do período.</p>
          </div>
        </div>
      </div>

      <div className="Analise-Categorias">
        <div className="Analise">
          <h2>Análise</h2>
        </div>
        <div className="Categorias">
          <h2>Categorias</h2>
          <div className="header">
            <p><strong>Categoria</strong></p>
            <p><strong>Total</strong></p>
          </div>
          <ul>
            {categoriasFixas.map((categoria) => (
              <li key={categoria}>
                <strong>{categoria}:</strong> R$ {totaisPorCategoria[categoria]?.toFixed(2) || '0.00'}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="Transacoes">
        <h2>Transações</h2>
        <div className="Container-Transacoes">
          <div className="Transacao header">
            <p><strong>Categoria</strong></p>
            <p><strong>Descrição</strong></p>
            <p><strong>Valor</strong></p>
          </div>
          {transacoes.map((t, i) => (
            <div key={i} className="Transacao">
              <p className="categoria">{t.categoria || 'Sem categoria'}</p> 
              <p>{t.descricao}</p>
              <p className={`valor ${t.valor < 0 ? 'negativo' : 'positivo'}`}>
                R$ {Math.abs(t.valor).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;

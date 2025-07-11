'use client';

import React, { useState } from 'react';
import AddValor from './components/AddValor';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

type Transacao = {
  valor: number;
  descricao: string;
  categoria: string | null;
  banco: string;
  data: Date;
};

const categoriasFixas = ['alimentação', 'transporte', 'saúde', 'lazer', 'contas'];
const coresCategorias: Record<string, string> = {
  alimentação: '#FF6384',
  transporte: '#36A2EB',
  saúde: '#FFCE56',
  lazer: '#4BC0C0',
  contas: '#9966FF',
};

const Home = () => {
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  const adicionarTransacao = (
    valor: number,
    descricao: string,
    categoria: string | null,
    banco: string
  ) => {
    const tipo = valor < 0 ? 'saida' : 'entrada';
    const novaTransacao: Transacao = {
      valor,
      descricao,
      categoria,
      banco,
      data: new Date(),
    };

    setTransacoes((prev) => [novaTransacao, ...prev]); // últimas inseridas primeiro

    if (tipo === 'entrada') setEntradas((e) => e + valor);
    else setSaidas((s) => s + valor);
  };

  const balanco = entradas + saidas;

  const totaisPorCategoria: Record<string, number> = {};
  transacoes.forEach((t) => {
    if (t.valor < 0 && t.categoria) {
      totaisPorCategoria[t.categoria] = (totaisPorCategoria[t.categoria] || 0) + Math.abs(t.valor);
    }
  });

  const dadosBarra = categoriasFixas
    .map((cat) => ({
      name: cat,
      valor: totaisPorCategoria[cat] || 0,
      cor: coresCategorias[cat],
    }))
    .filter((d) => d.valor > 0);

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
              onAdicionar={(valor, descricao, _categoria, banco) =>
                adicionarTransacao(valor, descricao, null, banco)
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
              onAdicionar={(valor, descricao, categoria, banco) =>
                adicionarTransacao(-Math.abs(valor), descricao, categoria, banco)
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
          <h2>Gastos por Categoria</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={dadosBarra}>
                <XAxis dataKey="name" stroke="#f0f0f0" />
                <YAxis stroke="#f0f0f0" />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor">
                  {dadosBarra.map((entry, index) => (
                    <Cell key={index} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
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
            <p><strong>Data</strong></p>
            <p><strong>Categoria</strong></p>
            <p><strong>Descrição</strong></p>
            <p><strong>Banco</strong></p>
            <p><strong>Valor</strong></p>
          </div>
          {transacoes.map((t, i) => (
            <div key={i} className="Transacao">
              <p>{t.data.toLocaleDateString('pt-BR')} {t.data.toLocaleTimeString('pt-BR')}</p>
              <p className="categoria">{t.categoria || 'Sem categoria'}</p>
              <p>{t.descricao}</p>
              <p>{t.banco || '-'}</p>
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

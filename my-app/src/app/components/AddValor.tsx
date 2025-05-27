'use client';

import React, { useState } from 'react';

type Props = {
  tipo: 'entrada' | 'saida';
  onAdicionar: (valor: number, descricao: string, categoria: string | null) => void;
};

const AddValor = ({ tipo, onAdicionar }: Props) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [valor, setValor] = useState<number>(0);
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('alimentação');

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => {
    setModalAberto(false);
    setValor(0);
    setDescricao('');
    setCategoria('alimentação');
  };

  const handleSalvar = () => {
    if (!descricao.trim()) {
      alert('Por favor, insira uma descrição.');
      return;
    }
    const valorFinal = tipo === 'saida' ? -Math.abs(valor) : Math.abs(valor);
    onAdicionar(
      Math.abs(valorFinal),
      descricao,
      tipo === 'entrada' ? null : categoria
    );
    fecharModal();
  };

  return (
    <>
      <button className="add-button" onClick={abrirModal}>+</button>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Nova {tipo === 'entrada' ? 'Entrada' : 'Saída'}</h2>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(parseFloat(e.target.value))}
              placeholder="Valor"
              inputMode="decimal"
              step="any"
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
            />
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição"
            />
            {tipo === 'saida' && (
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="alimentação">Alimentação</option>
                <option value="transporte">Transporte</option>
                <option value="saúde">Saúde</option>
                <option value="lazer">Lazer</option>
                <option value="contas">Contas</option>
              </select>
            )}
            <div className="modal-buttons">
              <button className="confirm" onClick={handleSalvar}>Salvar</button>
              <button className="cancel" onClick={fecharModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddValor;

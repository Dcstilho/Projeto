

const Home = () => {
  return (
    <main className="Container">
      <header>
        <h1>Finanças</h1>
      </header>

      <div className="Topo-Explicativo">
      <div className="Entradas">
        <div className="titulo">
          <h2>Entradas</h2>
          <button className="add-button">+</button>
          <p className="valor">R$ 0,00</p>
          <p className="descricao">Somada todas as entradas do período.</p>
          </div>
        </div>

        <div className="Saidas">
          <div className="titulo">
            <h2>Saídas</h2>
            <button className="add-button">+</button>
            <p className="valor">R$ 0,00</p>
            <p className="descricao">Somada todas as saídas do período.</p>
          </div>
        </div>
        <div className="Balanco">
          <div className="titulo">
            <h2>Balanço</h2>
            <p className="valor">R$ 0,00</p>
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
        </div>
      </div>

      <div className="Transacoes">
        <h2>Transações</h2>
      </div>
    </main>
  );
};

export default Home;

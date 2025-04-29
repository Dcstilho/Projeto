// components/Balance.tsx
interface BalanceProps {
    entradas: number;
    saidas: number;
  }
  
  const Balance: React.FC<BalanceProps> = ({ entradas, saidas }) => {
    const balancoClass = entradas > saidas ? "balanco-verde" : "balanco-vermelho";
    const saldo = (entradas - saidas).toFixed(2);
  
    return (
      <div className={`Balanço ${balancoClass}`}>
        <h2>Balanço: R${saldo}</h2>
      </div>
    );
  };
  
  export default Balance;
  
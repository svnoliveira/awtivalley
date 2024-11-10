import React, { useState } from "react";
import { StyledContainer, StyledSection, InfoCard, StyledButtonLink } from "./style";

interface Produto {
  id: number;
  nome: string;
  saldo: number;
}

export const ControleEstoque: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "Produto A", saldo: 10 },
    { id: 2, nome: "Produto B", saldo: 5 },
  ]);
  const [novoProdutoNome, setNovoProdutoNome] = useState("");
  const [novoProdutoSaldo, setNovoProdutoSaldo] = useState(0);

  const adicionarProduto = () => {
    const novoProduto: Produto = {
      id: produtos.length + 1,
      nome: novoProdutoNome,
      saldo: novoProdutoSaldo,
    };
    setProdutos([...produtos, novoProduto]);
    setNovoProdutoNome("");
    setNovoProdutoSaldo(0);
  };

  return (
    <StyledSection>
      <h1>Controle de Estoque</h1>
      <StyledContainer>
        <InfoCard>
          <li>
            <span>Nome do Produto</span>
            <span>Saldo</span>
          </li>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <span>{produto.nome}</span>
              <span>{produto.saldo}</span>
            </li>
          ))}
        </InfoCard>
        <div>
          <h2>Adicionar Novo Produto</h2>
          <input
            type="text"
            placeholder="Nome do Produto"
            value={novoProdutoNome}
            onChange={(e) => setNovoProdutoNome(e.target.value)}
          />
          <input
            type="number"
            placeholder="Saldo"
            value={novoProdutoSaldo}
            onChange={(e) => setNovoProdutoSaldo(Number(e.target.value))}
          />
          <StyledButtonLink onClick={adicionarProduto}>Adicionar Produto</StyledButtonLink>
        </div>
      </StyledContainer>
    </StyledSection>
  );
};

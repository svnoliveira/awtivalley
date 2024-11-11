import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
  padding: 10px;
  font-family: 'Arial', sans-serif;

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("/images/hero-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  @media (min-width: 768px) {
    margin-top: 20px;
  }
`;

export const Sequence = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  background-color: #f0f0f0;
  border-radius: 15px;

  @media (min-width: 768px) {
    margin-top: 50px;
  }
`;

export const CharContainer = styled.div<{ marginAnimation: string }>`
  display: flex;
  margin: ${({ marginAnimation }) => marginAnimation};
  animation: fillMargin 10s linear forwards;

  @keyframes fillMargin {
    from {
      margin: 0;
    }
    to {
      margin: 10px;
    }
  }

  @media (min-width: 768px) {
    margin: ${({ marginAnimation }) => marginAnimation};
  }
`;

export const Char = styled.div<{ isCurrent: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin: 0 5px;
  font-size: 24px;
  font-weight: bold;
  color: ${({ isCurrent }) => (isCurrent ? 'green' : 'white')};
  border: 2px solid ${({ isCurrent }) => (isCurrent ? 'green' : 'white')};
  border-radius: 5px;
  background-color: ${({ isCurrent }) => (isCurrent ? 'lightgreen' : 'transparent')};
  font-family: 'Verdana', sans-serif;

  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 28px;
    margin: 0 10px;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;

  @media (min-width: 768px) {
    margin-top: 20px;
  }
`;

export const ProgressBar = styled.div<{ width: number }>`
  height: 100%;
  background-color: green;
  width: ${({ width }) => width}%;
  transition: width 1s linear; /* Ajuste de transição */
`;

export const GameOver = styled.div`
  font-family: 'SkylightGraffiti', sans-serif;
  font-size: 32px;
  color: red;
  margin: 20px 0;
`;

export const Success = styled.div`
  font-family: 'SkylightGraffiti', sans-serif;
  font-size: 32px;
  color: green;
  margin: 20px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button<{ color: string }>`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${({ color }) => color};
  color: white;
  border: none;
  border-radius: 5px;
  font-family: 'Tahoma', sans-serif;

  @media (min-width: 768px) {
    padding: 15px 30px;
    font-size: 18px;
  }
`;

export const StartButton = styled(Button).attrs({ color: '#007bff' })``;
export const RestartButton = styled(Button).attrs({ color: '#4caf50' })``;
export const ResetButton = styled(Button).attrs({ color: '#f44336' })``;
export const BuyButton = styled(Button).attrs({ color: '#ffff00' })``;

export const ScoreInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-family: 'Arial', sans-serif;

  @media (min-width: 768px) {
    font-size: 18px;
    padding: 15px;
  }
`;

export const ScoresList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Georgia', serif;
`;

export const ScoreListItem = styled.li`
  font-size: 18px;
  margin: 5px 0;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: url('/ImgMiniGame/home/dashboard-bg.png') no-repeat center center;
  background-size: cover;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  color: white;
  font-family: 'Arial', sans-serif;
`;

export const PrizeImage = styled.img`
  max-width: 100px;
  height: auto;
  margin: 10px auto 0;
  border: 1px solid #00ff00;
  background-color: #c0e4c2;
  display: block;
`;

export const GameOverImage = styled.img`
  max-width: 100px;
  height: auto;
  margin-top: 10px;
`;

export const PrizeHistoryList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 300px; /* Set a max height for the list */
  overflow-y: auto; /* Add vertical scrollbar */
`;

export const PrizeHistoryItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: left;

  p {
    margin: 5px 0;
  }
`;

export const ShopItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ShopItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  span {
    margin-right: 10px;
  }

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const PurchaseHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PurchaseHistoryItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

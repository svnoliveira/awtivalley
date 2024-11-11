import React, { useState, useEffect, useReducer, useCallback, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  AppContainer,
  Sequence,
  Char as CharBase,
  StartButton,
  RestartButton,
  ResetButton,
  ButtonContainer,
  ScoreInput,
  ProgressBarContainer,
  ProgressBar,
  Modal,
  ModalContent,
  PrizeImage,
  CharContainer as CharContainerBase,
  PrizeHistoryList,
  PrizeHistoryItem,
  GameOverImage,
  ShopItemList,
  ShopItem,
  BuyButton,
} from './style';
import {
  saveScore,
  getScores,
  resetStats,
  resetScores,
  saveStats,
  getStats,
  generateRandomSequence,
  generateRandomPrize,
  getShopItems,
} from './utils';
import { useSpring, animated } from 'react-spring';
import { userStore } from "@/stores/userStore";

const TIME = 5;
const QtdLetras = 10;
const ficha = 5;
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1254766067625103380/EmAQHkTwTceIo15_2Q3Vvr8WeaU4UVqlsMlAnlZM0zSCiiuk-Eunmu57eoFnha4kEl3g"; // Adicione a URL do webhook do Discord aqui
const DISCORD_WIN_WEBHOOK_URL = "https://discord.com/api/webhooks/1198048319147081828/92dfDbbV89xAX72hIsEEbZe_IODYzNDtvFmaAJ0ml_wW7MobVelH-tc30o_xUWN4bJ4n"; // Adicione a URL do webhook de vitórias aqui

// Função para enviar mensagem ao Discord
const sendWebhook = async (url: string, message: string) => {
  try {
    await axios.post(url, { content: message });
    console.log('Mensagem de webhook enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar webhook:', error);
  }
};

type GameState = {
  sequence: { char: string, imageUrl: string }[],
  currentIndex: number,
  timeLeft: number,
  gameOver: boolean,
  success: boolean,
  isGameStarted: boolean,
  scores: { name: string, score: number }[],
  totalGames: number,
  totalWins: number,
  totalScore: number,
  prize: { name: string, quantity: number, imageUrl: string, value: number } | null,
  isModalOpen: boolean,
  showSequence: boolean,
  isStatsModalOpen: boolean,
  isSuccessModalOpen: boolean,
  isGameOverModalOpen: boolean,
  prizeHistory: { name: string, quantity: number, imageUrl: string }[],
  isShopModalOpen: boolean,
  saldo: number,
  name: string,
};

const initialGameState: GameState = {
  sequence: generateRandomSequence(QtdLetras),
  currentIndex: 0,
  timeLeft: TIME,
  gameOver: false,
  success: false,
  isGameStarted: false,
  scores: [],
  totalGames: 0,
  totalWins: 0,
  totalScore: 0,
  prize: null,
  isModalOpen: false,
  showSequence: false,
  isStatsModalOpen: false,
  isSuccessModalOpen: false,
  isGameOverModalOpen: false,
  prizeHistory: [],
  isShopModalOpen: false,
  saldo: 0,
  name: '',
};

type Action =
  | { type: 'START_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'UPDATE_TIME', payload: number }
  | { type: 'INCREMENT_INDEX' }
  | { type: 'GAME_OVER' }
  | { type: 'SUCCESS', payload: { name: string, quantity: number, imageUrl: string, value: number } }
  | { type: 'UPDATE_STATS' }
  | { type: 'SET_SCORES', payload: { name: string, score: number }[] }
  | { type: 'SET_SALDO', payload: number }
  | { type: 'SET_PRIZE_HISTORY', payload: { name: string, quantity: number, imageUrl: string }[] }
  | { type: 'SET_MODAL', payload: { [key: string]: boolean } }
  | { type: 'SET_NAME', payload: string }
  | { type: 'LOAD_STATE_FROM_STORAGE', payload: Partial<GameState> };

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, isGameStarted: true, showSequence: true, sequence: generateRandomSequence(QtdLetras), currentIndex: 0, timeLeft: TIME, gameOver: false, success: false, isModalOpen: false, isSuccessModalOpen: false, isGameOverModalOpen: false };
    case 'RESET_GAME':
      return { ...state, sequence: generateRandomSequence(QtdLetras), currentIndex: 0, timeLeft: TIME, gameOver: false, success: false, isModalOpen: false, isSuccessModalOpen: false, isGameOverModalOpen: false };
    case 'UPDATE_TIME':
      return { ...state, timeLeft: action.payload };
    case 'INCREMENT_INDEX':
      return { ...state, currentIndex: state.currentIndex + 1 };
    case 'GAME_OVER':
      const updatedGameOverStats = { totalGames: state.totalGames + 1, totalWins: state.totalWins, totalScore: state.totalScore };
      localStorage.setItem('stats', JSON.stringify(updatedGameOverStats));
      return { ...state, ...updatedGameOverStats, gameOver: true, isGameOverModalOpen: true, isGameStarted: false };
    case 'SUCCESS':
      const updatedSuccessStats = { totalGames: state.totalGames + 1, totalWins: state.totalWins + 1, totalScore: state.totalScore + state.sequence.length };
      localStorage.setItem('stats', JSON.stringify(updatedSuccessStats));
      return { ...state, ...updatedSuccessStats, success: true, isSuccessModalOpen: true, isGameStarted: false, prize: action.payload, isModalOpen: true };
    case 'SET_SCORES':
      return { ...state, scores: action.payload };
    case 'SET_SALDO':
      return { ...state, saldo: action.payload };
    case 'SET_PRIZE_HISTORY':
      return { ...state, prizeHistory: action.payload };
    case 'SET_MODAL':
      return { ...state, ...action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'LOAD_STATE_FROM_STORAGE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const useSounds = () => {
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);
  const successSoundRef = useRef<HTMLAudioElement | null>(null);
  const timeoutSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      correctSoundRef.current = new Audio('/Audio/correct.mp3');
      wrongSoundRef.current = new Audio('/Audio/wrong.mp3');
      successSoundRef.current = new Audio('/Audio/success.mp3');
      timeoutSoundRef.current = new Audio('/Audio/timeout.mp3');
    }
  }, []);

  return { correctSoundRef, wrongSoundRef, successSoundRef, timeoutSoundRef };
};

const CharContainer = styled(CharContainerBase)<{ marginAnimation: string }>`
  margin: ${({ marginAnimation }) => marginAnimation};
`;

const Char = styled(CharBase)<{ isCurrent: boolean }>`
  background-color: ${({ isCurrent }) => (isCurrent ? 'lightgreen' : 'transparent')};
`;

export const MinigameCDA: React.FC = () => {
  const { userData, loadUser } = userStore((store) => store);
  const userName = userData?.user.nome || '';
  const userPassaporte = userData?.user.passaporte || '';
  const discordID = userData?.user.discord_id || '';

  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { correctSoundRef, wrongSoundRef, successSoundRef, timeoutSoundRef } = useSounds();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saldoInicial = localStorage.getItem('saldo');
      const stats = getStats();
      const prizeHistory = localStorage.getItem('prizeHistory');
      const scores = getScores();

      const initialStateFromStorage: Partial<GameState> = {
        saldo: saldoInicial ? parseInt(saldoInicial) : 0,
        ...stats,
        prizeHistory: prizeHistory ? JSON.parse(prizeHistory) : [],
        scores,
      };

      dispatch({ type: 'LOAD_STATE_FROM_STORAGE', payload: initialStateFromStorage });

      // Set the user's name in the game state
      if (userName && userPassaporte) {
        dispatch({ type: 'SET_NAME', payload: `${userName} | ${userPassaporte}` });
      }
    }
  }, [userName, userPassaporte]);

  const updateSaldo = useCallback((valor: number) => {
    if (typeof window !== 'undefined') {
      const novoSaldo = state.saldo + valor;
      dispatch({ type: 'SET_SALDO', payload: novoSaldo });
      localStorage.setItem('saldo', novoSaldo.toString());
    }
  }, [state.saldo]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (state.timeLeft > 0 && !state.gameOver && !state.success && state.isGameStarted) {
      timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIME', payload: state.timeLeft - 1 });
      }, 1000); // Ajusta para 1 segundo
    } else if (state.timeLeft === 0) {
      timeoutSoundRef.current?.play();
      dispatch({ type: 'GAME_OVER' });
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state.timeLeft, state.gameOver, state.success, state.isGameStarted, timeoutSoundRef]);

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    if (state.gameOver || state.success || !state.isGameStarted) return;
    const keyPressed = event.key.toUpperCase();
  
    if (keyPressed === state.sequence[state.currentIndex].char) {
      correctSoundRef.current?.play();
      if (state.currentIndex === state.sequence.length - 1) {
        successSoundRef.current?.play();
        const randomPrize = generateRandomPrize();
        dispatch({ type: 'SUCCESS', payload: randomPrize });
  
        if (userName && userPassaporte) {
          saveScore(userName, userPassaporte, state.currentIndex + 1);
        }
        dispatch({ type: 'SET_SCORES', payload: getScores() });
  
        if (randomPrize) {
          const updatedPrizeHistory = [...state.prizeHistory, randomPrize];
          dispatch({ type: 'SET_PRIZE_HISTORY', payload: updatedPrizeHistory });
          localStorage.setItem('prizeHistory', JSON.stringify(updatedPrizeHistory));
          updateSaldo(randomPrize.value);

          // Enviar webhook de vitória
          const winMessage = `🏆 **Vitória!** 🏆\n\n
          **Nome:** ${state.name}\n
          ${discordID}\n
          **Prêmio:** ${randomPrize.name}\n
          **Quantidade:** ${randomPrize.quantity}`;
          sendWebhook(DISCORD_WIN_WEBHOOK_URL, winMessage);
        }
  
      } else {
        dispatch({ type: 'INCREMENT_INDEX' });
      }
    } else {
      wrongSoundRef.current?.play();
      dispatch({ type: 'GAME_OVER' });
    }
  }, [state, correctSoundRef, wrongSoundRef, successSoundRef, userName, userPassaporte, updateSaldo]);
  

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const startGame = () => {
    if (!userName || !userPassaporte) {
      alert('As informações do usuário estão indisponíveis. Por favor, logue na sua conta.');
      return;
    }
    const novoSaldo = state.saldo - ficha;
    dispatch({ type: 'SET_SALDO', payload: novoSaldo });
    localStorage.setItem('saldo', novoSaldo.toString());
    dispatch({ type: 'START_GAME' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const handleResetScores = () => {
    if (typeof window !== 'undefined') {
      resetScores();
      resetStats();
      dispatch({ type: 'SET_SCORES', payload: getScores() });
      dispatch({ type: 'SET_PRIZE_HISTORY', payload: [] });
      localStorage.removeItem('prizeHistory');
    }
  };

  const handleStatsModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'SET_MODAL', payload: { isStatsModalOpen: false } });
    }
  };

  const toggleStatsModal = () => {
    dispatch({ type: 'SET_MODAL', payload: { isStatsModalOpen: !state.isStatsModalOpen } });
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'SET_MODAL', payload: { isModalOpen: false } });
    }
  };

  const handleGameOverModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'SET_MODAL', payload: { isGameOverModalOpen: false } });
    }
  };

  const handleBuyItem = async (item: { name: string, price: number, imageUrl: string }) => {
    if (state.saldo >= item.price) {
      const novoSaldo = state.saldo - item.price;
      dispatch({ type: 'SET_SALDO', payload: novoSaldo });
      localStorage.setItem('saldo', novoSaldo.toString());
      alert(`Você comprou ${item.name} por ${item.price} fichas.`);
  
      // Enviar webhook de compra
      const buyMessage = `🛒 **Compra Realizada!** 🛒\n\n
      **Nome:** ${state.name}\n
      <@${discordID}>\n
      **Item:** ${item.name}\n
      **Preço:** ${item.price} fichas`;
      sendWebhook(DISCORD_WEBHOOK_URL, buyMessage);
    } else {
      alert('Saldo insuficiente para comprar este item.');
    }
  };

  const toggleShopModal = () => {
    dispatch({ type: 'SET_MODAL', payload: { isShopModalOpen: !state.isShopModalOpen } });
  };

  const charSpring = useSpring({
    to: { transform: 'scale(1.2)' },
    from: { transform: 'scale(1)' },
    reset: true,
    reverse: state.currentIndex % 2 === 0,
    config: { tension: 0, friction: 0 },
  });

  const [marginAnimation, setMarginAnimation] = useState<string>('0');

  useEffect(() => {
    if (state.isGameStarted) {
      const timer = setInterval(() => {
        const elapsedSeconds = TIME - state.timeLeft;
        if (elapsedSeconds <= 10) {
          setMarginAnimation(`${(elapsedSeconds / 10) * 20}px 0`);
        } else {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.isGameStarted, state.timeLeft]);

  return (
    <AppContainer style={{ backgroundImage: `url("/ImgMiniGame/home/hero-bg.png")` }}>
      <h1>Mini Game CDA</h1>
      <Sequence>
        {state.sequence.map((item, index) => (
          <CharContainer marginAnimation={marginAnimation} key={index}>
            <animated.div style={charSpring}>
              <Char isCurrent={index === state.currentIndex}>
                <img src={item.imageUrl} alt={`Image ${index}`} style={{ width: 50, height: 50 }} />
              </Char>
            </animated.div>
          </CharContainer>
        ))}
      </Sequence>
      <ProgressBarContainer>
        <ProgressBar width={(state.timeLeft / TIME) * 100} />
      </ProgressBarContainer>
      <ScoreInput
        type="text"
        placeholder={`Enter your name`}
        value={state.name}
        readOnly
      />
      <ButtonContainer>
        <StartButton onClick={startGame} color="#007bff">Iniciar</StartButton>
        <RestartButton onClick={resetGame} color="#4caf50">Restart</RestartButton>
        <ResetButton onClick={handleResetScores} color="#f44336">Resetar Dados</ResetButton>
        <StartButton onClick={toggleStatsModal} color="#007bff">Histórico</StartButton>
        <BuyButton onClick={toggleShopModal} color="#ffff00">Loja</BuyButton>
      </ButtonContainer>
      {state.isModalOpen && state.prize && (
        <Modal onClick={handleModalClick}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Parabéns!! Olha só o lindo presente que você recebeu😉!</h2>
            <PrizeImage src="ImgMiniGame/SucessoImg/sucesso-image3.gif" alt="Sucesso" />
            <p>Você ganhou: {state.prize.name}</p>
            <p>Und: {state.prize.quantity}</p>
            <PrizeImage src={state.prize.imageUrl} alt={state.prize.name} />
          </ModalContent>
        </Modal>
      )}
      {state.isGameOverModalOpen && (
        <Modal onClick={handleGameOverModalClick}>
          <ModalContent>
            <h2>Game Over</h2>
            <p>O tempo acabou ou você pressionou a tecla errada.</p>
            <GameOverImage src="ImgMiniGame/GameOverImg/gameover-image1.gif" alt="Game Over" />
          </ModalContent>
        </Modal>
      )}
      {state.isStatsModalOpen && (
        <Modal onClick={handleStatsModalClick}>
          <ModalContent>
            <h2>Estatísticas:</h2>
            <div>
              <p>Saldo: R$ {state.saldo.toFixed(2)}</p>
            </div>
            <p>Total de jogos: {state.totalGames}</p>
            <p>Total de vitórias: {state.totalWins}</p>
            {/*<p>Score Total: {state.totalScore}</p>*/}
            <h3>Histórico de Prêmios:</h3>
            <PrizeHistoryList>
              {state.prizeHistory.map((prize, index) => (
                <PrizeHistoryItem key={index}>
                  <p>Nome: {prize.name}</p>
                  <p>Quantidade: {prize.quantity}</p>
                  <PrizeImage src={prize.imageUrl} alt={prize.name} />
                </PrizeHistoryItem>
              ))}
            </PrizeHistoryList>
          </ModalContent>
        </Modal>
      )}
      {state.isShopModalOpen && (
        <Modal onClick={toggleShopModal}>
          <ModalContent>
            <h2>Loja</h2>
            <ShopItemList>
              {getShopItems().map((item, index) => (
                <ShopItem key={index}>
                  <p>{item.name}</p>
                  <p>Preço: {item.price} fichas</p>
                  <img src={item.imageUrl} alt={item.name} style={{ width: 50, height: 50 }} />
                  <BuyButton onClick={() => handleBuyItem(item)} color="#ffff00">Comprar</BuyButton>
                </ShopItem>
              ))}
            </ShopItemList>
          </ModalContent>
        </Modal>
      )}
    </AppContainer>
  );
};

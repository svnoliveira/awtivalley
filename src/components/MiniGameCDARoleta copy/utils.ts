// utils.ts

export const saveScore = (name: string, passaporte: string, score: number): void => {
  const scores = getScores();
  scores.push({ name: `${name} | ${passaporte}`, score });
  localStorage.setItem('scores', JSON.stringify(scores));
};

export const getScores = (): { name: string, score: number }[] => {
  const scores = localStorage.getItem('scores');
  return scores ? JSON.parse(scores) : [];
};

export const resetScores = (): void => {
  localStorage.removeItem('scores');
};

export const saveStats = (stats: { totalGames: number, totalWins: number, totalScore: number }): void => {
  localStorage.setItem('stats', JSON.stringify(stats));
};

export const getStats = (): { totalGames: number, totalWins: number, totalScore: number } => {
  const stats = localStorage.getItem('stats');
  return stats ? JSON.parse(stats) : { totalGames: 0, totalWins: 0, totalScore: 0 };
};

export const resetStats = (): void => {
  localStorage.removeItem('stats');
};

export const generateRandomSequence = (length: number): { char: string, imageUrl: string }[] => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const images: { [key: string]: string } = {
    'A': '/ImgMiniGame/LETRAS/A.gif',
    'B': '/ImgMiniGame/LETRAS/B.gif',
    'C': '/ImgMiniGame/LETRAS/C.gif',
    'D': '/ImgMiniGame/LETRAS/D.gif',
    'E': '/ImgMiniGame/LETRAS/E.gif',
    'F': '/ImgMiniGame/LETRAS/F.gif',
    'G': '/ImgMiniGame/LETRAS/G.gif',
    'H': '/ImgMiniGame/LETRAS/H.gif',
    'I': '/ImgMiniGame/LETRAS/I.gif',
    'J': '/ImgMiniGame/LETRAS/J.gif',
    'K': '/ImgMiniGame/LETRAS/K.gif',
    'L': '/ImgMiniGame/LETRAS/L.gif',
    'M': '/ImgMiniGame/LETRAS/M.gif',
    'N': '/ImgMiniGame/LETRAS/N.gif',
    'O': '/ImgMiniGame/LETRAS/O.gif',
    'P': '/ImgMiniGame/LETRAS/P.gif',
    'Q': '/ImgMiniGame/LETRAS/Q.gif',
    'R': '/ImgMiniGame/LETRAS/R.gif',
    'S': '/ImgMiniGame/LETRAS/S.gif',
    'T': '/ImgMiniGame/LETRAS/T.gif',
    'U': '/ImgMiniGame/LETRAS/U.gif',
    'V': '/ImgMiniGame/LETRAS/V.gif',
    'W': '/ImgMiniGame/LETRAS/W.gif',
    'X': '/ImgMiniGame/LETRAS/X.gif',
    'Y': '/ImgMiniGame/LETRAS/Y.gif',
    'Z': '/ImgMiniGame/LETRAS/Z.gif',
  };

  let result: { char: string, imageUrl: string }[] = [];
  for (let i = 0; i < length; i++) {
    const char = characters.charAt(Math.floor(Math.random() * characters.length));
    result.push({ char, imageUrl: images[char] });
  }
  return result;
};

export const generateRandomPrize = (): { name: string, quantity: number, imageUrl: string, value: number } => {
  const weightedPrizes = [
    { name: 'Notebook', quantity: 1, imageUrl: '/ImgMiniGame/notebook.png', weight: 50, value: 10 },
    { name: 'Analgesico', quantity: 5, imageUrl: '/ImgMiniGame/analgesic.png', weight: 50, value: 10 },
    { name: 'Dinheiro', quantity: 2, imageUrl: '/ImgMiniGame/dollars.png', weight: 80, value: 2 },
    { name: 'Dinheiro', quantity: 100, imageUrl: '/ImgMiniGame/dollars.png', weight: 30, value: 100 },
    { name: 'Dinheiro', quantity: 20, imageUrl: '/ImgMiniGame/dollars.png', weight: 50, value: 20 },
    { name: 'Dinheiro Sujo', quantity: 30, imageUrl: '/ImgMiniGame/dollarsz.png', weight: 30, value: 15 },
    { name: 'Dinheiro Sujo', quantity: 60, imageUrl: '/ImgMiniGame/dollarsz.png', weight: 50, value: 30 },
    { name: 'Dinheiro Sujo', quantity: 2, imageUrl: '/ImgMiniGame/dollarsz.png', weight: 80, value: 1 },
    { name: 'Dinheiro Sujo', quantity: 14, imageUrl: '/ImgMiniGame/dollarsz.png', weight: 30, value: 7 },
    { name: 'G36c', quantity: 1, imageUrl: '/ImgMiniGame/g36c.png', weight: 5, value: 10 },
    { name: 'HotDog', quantity: 2, imageUrl: '/ImgMiniGame/hotdog.png', weight: 50, value: 10 },
    { name: 'Kit Médico', quantity: 1, imageUrl: '/ImgMiniGame/medkit.png', weight: 30, value: 10 },
    { name: 'Panela', quantity: 5, imageUrl: '/ImgMiniGame/pan.png', weight: 60, value: 10 },
    { name: 'Paraquedas', quantity: 1, imageUrl: '/ImgMiniGame/parachute.png', weight: 20, value: 10 },
    { name: 'Rosa', quantity: 2, imageUrl: '/ImgMiniGame/rose.png', weight: 50, value: 10 },
    { name: 'Sigsauer 556', quantity: 1, imageUrl: '/ImgMiniGame/sigsauer556.png', weight: 5, value: 10 },
    { name: 'Desodorante', quantity: 5, imageUrl: '/ImgMiniGame/spray03.png', weight: 60, value: 10 },
    { name: 'Aug', quantity: 1, imageUrl: '/ImgMiniGame/stayraug.png', weight: 5, value: 10 },
    { name: 'Sushi', quantity: 3, imageUrl: '/ImgMiniGame/sushi.png', weight: 50, value: 10 },
    { name: 'Tacos', quantity: 3, imageUrl: '/ImgMiniGame/tacos.png', weight: 50, value: 10 },
    { name: 'Caixa CatCafé', quantity: 3, imageUrl: '/ImgMiniGame/uwucoffee3.png', weight: 50, value: 10 },
    { name: 'Colete', quantity: 1, imageUrl: '/ImgMiniGame/vest.png', weight: 2, value: 10 },
    { name: 'Pé de Maconha', quantity: 1, imageUrl: '/ImgMiniGame/weedclone.png', weight: 2, value: 10 },
    { name: 'Xbox', quantity: 5, imageUrl: '/ImgMiniGame/xbox.png', weight: 60, value: 10 },
    { name: 'Nitro', quantity: 1, imageUrl: '/ImgMiniGame/nitro.png', weight: 2, value: 10 },
    { name: 'Multa', quantity: 1, imageUrl: '/ImgMiniGame/multa.png', weight: 30, value: -250 },
  ];

  // Calculando o peso total
  const totalWeight = weightedPrizes.reduce((acc, prize) => acc + (prize.weight || 0), 0);

  // Gerando um número aleatório com base no peso total
  let randomNumber = Math.random() * totalWeight;

  // Encontrando o item com base no número aleatório gerado
  let selectedPrize = weightedPrizes[0];
  for (const prize of weightedPrizes) {
    if (randomNumber < prize.weight) {
      selectedPrize = prize;
      break;
    }
    randomNumber -= prize.weight;
  }

  return selectedPrize;
};

// Função para retornar os itens da loja
export const getShopItems = () => {
  return [
    { name: 'Item 1', price: 0, imageUrl: '/ImgMiniGame/dollars.png' },
    { name: 'Item 2', price: 20, imageUrl: '/ImgMiniGame/dollars.png' },
    { name: 'Item 3', price: 30, imageUrl: '/ImgMiniGame/dollars.png' },
    // Adicione mais itens conforme necessário
  ];
};

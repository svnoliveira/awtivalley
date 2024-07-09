import React, { useState } from 'react';
import styled from 'styled-components';

interface ClickableImageProps {
  src: string;
  onClick: (location: string) => void;
}

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px; /* Ajuste conforme necessário */
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Tooltip = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  pointer-events: none;
  transform: translate(-50%, -100%);
`;

const ClickableImage: React.FC<ClickableImageProps> = ({ src, onClick }) => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setTooltip({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setTooltip({ x: 0, y: 0, visible: false });
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const location = determineLocation(x, y);
    onClick(location);
  };

  const determineLocation = (x: number, y: number): string => {
    // Adicione aqui a lógica para determinar a localização com base nas coordenadas x e y.
    if (x >= 54 && x <= 127 && y >= 253 && y <= 272) {
      return 'Paleto Bay';
    } else if (x >= 165 && x <= 244 && y >= 235 && y <= 248) {
      return 'Sandy Shores';
    } else if (x >= 350 && x <= 415 && y >= 274 && y <= 290) {
        return 'Aeroporto';
    } else {
      return `Este local não precisa relatar`; // Retorna as coordenadas se não estiver em nenhuma área definida
    }
  };

  return (
    <ImageWrapper>
      <StyledImage
        src={src}
        alt="Localização"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {tooltip.visible && (
        <Tooltip x={tooltip.x} y={tooltip.y}>
          {`X: ${tooltip.x}, Y: ${tooltip.y}`}
        </Tooltip>
      )}
    </ImageWrapper>
  );
};

export default ClickableImage;

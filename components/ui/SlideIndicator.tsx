import React from 'react';
import { TouchableOpacity,View } from 'react-native';

// Tipos do componente
interface SlideIndicatorsProps {
  totalItems: number; // Número total de itens
  currentIndex: number; // Index atual
  onIndicatorPress?: (index: number) => void; // Função quando tocar no indicador (opcional)

  // Customizações visuais (todas opcionais)
  activeWidth?: number; // Largura do indicador ativo (default: 50)
  inactiveWidth?: number; // Largura dos indicadores inativos (default: 10)
  height?: number; // Altura dos indicadores (default: 4)
  spacing?: number; // Espaçamento entre indicadores (default: 5)
  activeColor?: string; // Cor do indicador ativo (default: 'bg-cor-primaria')
  inactiveColor?: string; // Cor dos indicadores inativos (default: 'bg-cor-primaria')
  containerMarginTop?: number; // Margem superior do container (default: 16)
  containerClassName?: string; // Classes adicionais do container
  indicatorClassName?: string; // Classes adicionais dos indicadores
}

const SlideIndicators: React.FC<SlideIndicatorsProps> = ({
  totalItems,
  currentIndex,
  onIndicatorPress,
  activeWidth = 30,
  inactiveWidth = 10,
  height = 4,
  spacing = 4,
  activeColor = 'bg-cor-primaria',
  inactiveColor = 'bg-cor-primaria',
  containerMarginTop = 16,
  containerClassName = '',
  indicatorClassName = '',
}) => {
  // Criar array com base no número total de itens
  const indicators = Array.from({ length: totalItems }, (_, index) => index);

  // Função para lidar com toque no indicador
  const handleIndicatorPress = (index: number) => {
    if (onIndicatorPress) {
      onIndicatorPress(index);
    }
  };

  // Renderizar indicador individual
  const renderIndicator = (index: number) => {
    const isActive = index === currentIndex;

    const indicatorStyle = {
      height: height,
      width: isActive ? activeWidth : inactiveWidth,
      marginHorizontal: spacing / 8,
    };

    const Component = onIndicatorPress ? TouchableOpacity : View;

    return (
      <Component
        key={index}
        style={indicatorStyle}
        className={`rounded-full ${isActive ? activeColor : inactiveColor} ${indicatorClassName}`}
        onPress={() => handleIndicatorPress(index)}
        activeOpacity={onIndicatorPress ? 0.7 : 1}
      />
    );
  };

  return (
    <View
      className={`flex-row items-center justify-center ${containerClassName}`}
      style={{ marginTop: containerMarginTop, gap: spacing }}>
      {indicators.map(renderIndicator)}
    </View>
  );
};

export default SlideIndicators;

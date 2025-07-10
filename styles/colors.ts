import { designTokens } from './designTokens';
export const colors = designTokens.colors;

// Helpers para usar as cores
export const getColor = (colorPath) => {
  const path = colorPath.split('.');
  let color = designTokens.colors;

  for (const key of path) {
    color = color[key];
  }

  return color;
};

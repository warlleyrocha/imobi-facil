// utils/propertyStyles.ts

/**
 * Retorna as classes de estilo para o badge de finalidade
 * baseado no tipo (venda ou aluguel)
 */
export const getPurposeStyles = (finalidade: string) => {
  const isVenda = finalidade.toLowerCase() === 'venda';

  return {
    containerClass: isVenda ? 'bg-green-light' : 'bg-blue-light',
    textClass: isVenda ? 'text-green-dark' : 'text-blue-dark',
  };
};

/**
 * Retorna as classes completas concatenadas para uso direto
 */
export const getPurposeClassName = (finalidade: string) => {
  const { containerClass, textClass } = getPurposeStyles(finalidade);
  return {
    container: `h-[24px] items-center justify-center rounded-full px-[10px] ${containerClass}`,
    text: `font-inter-medium text-[10px] ${textClass}`,
  };
};

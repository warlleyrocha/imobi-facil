
// src/utils/masks.ts
const onlyNumbers = (text: string) => text.replace(/\D/g, '');

export const maskDate = (value: string) => {
  let v = onlyNumbers(value);
  v = v.slice(0, 8);
  if (v.length >= 5) return v.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
  if (v.length >= 3) return v.replace(/(\d{2})(\d{0,2})/, '$1/$2');
  return v;
};

export const maskCPF = (value: string) => {
  let v = onlyNumbers(value);
  v = v.slice(0, 11);
  if (v.length >= 10) return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  if (v.length >= 7) return v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  if (v.length >= 4) return v.replace(/(\d{3})(\d{0,3})/, '$1.$2');
  return v;
};

export const normalizeText = (text: string) => {
  return text.replace(/\s+/g, ' ').trimStart();
};

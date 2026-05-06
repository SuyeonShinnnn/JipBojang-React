export const getCssVar = (varName: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

import tinycolor from 'tinycolor2';

export const getTextColor = (hex: string): string => {
    const hsl = tinycolor(hex).toHsl();
    hsl.l = 0.8;
    hsl.s = Math.min(0.5, hsl.s);
    return tinycolor(hsl).toHexString();
};

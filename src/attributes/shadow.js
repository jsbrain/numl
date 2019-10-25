import { convertUnit } from '../helpers';

export default function shadowAttr(val) {
  if (val == null) return val;

  const depth = val === '' ? '1rem' : convertUnit(val, '.5rem');

  return {
    '--nu-depth-shadow': `0 0 ${depth} rgba(0, 0, 0, calc(var(--nu-theme-shadow-opacity) / ${(Number(val) ||
      1) * 2}))`,
  };
}
import { devMode, extractMods, warn } from '../helpers';

const MAP = {};

function set(name, styles) {
  MAP[name] = styles;
}

['inherit'].forEach(name => set(name, { 'font-style': 'inherit' }));
['i', 'italic'].forEach(name => set(name, { 'font-style': 'italic' }));
['ni', 'non-italic'].forEach(name => set(name, { 'font-style': 'normal' }));
['u', 'underline'].forEach(name => set(name, { 'text-decoration': 'underline' }));
['s', 'line-through'].forEach(name => set(name, { 'text-decoration': 'line-through' }));
set('no-decoration', { 'text-decoration': 'none' });
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(index => set(`w${index}`, { '--nu-font-weight': `${index}00` }));
['uppercase', 'lowercase', 'capitalize'].forEach(name => set(name, { 'text-transform': name }));

['baseline', 'sub', 'sup', 'middle', 'top', 'bottom'].forEach(name => set(name, { 'vertical-align': name === 'sup' ? 'super' : name }));
['text-top', 'text-bottom'].forEach(name => set(name.replace('text-', ''), { 'vertical-align': name }));

set('v-middle', { 'vertical-align': 'var(--nu-inline-offset)' });

['left', 'right', 'center', 'justify'].forEach(name => set(name, { 'text-align': name }));

set('monospace', { 'font-family': 'monospace', 'word-spacing': 'normal' });
set('spacing', { 'letter-spacing': 'var(--nu-border-width)' });
set('ellipsis', {
  'max-width': '100%',
  'overflow': 'hidden',
  'white-space': 'nowrap',
  'text-overflow': 'ellipsis',
});
set('tabular-nums', {
  'font-variant-numeric': 'tabular-nums',
});

set('wrap', { 'white-space': 'normal' });
set('nowrap', { 'white-space': 'nowrap' });
set('pre', { 'white-space': 'pre' });
set('pre-wrap', { 'white-space': 'pre-wrap' });
set('pre-line', { 'white-space': 'pre-line' });
set('break-spaces', { 'white-space': 'break-spaces' });

set('heading', { 'font-weight': 'var(--nu-heading-font-weight)' });
set('normal', { 'font-weight': 'var(--nu-normal-font-weight)' });
set('bold', { 'font-weight': 'var(--nu-bold-font-weight)' });
set('light', { 'font-weight': 'var(--nu-light-font-weight)' });
set('bolder', { 'font-weight': 'calc(var(--nu-font-weight) + var(--nu-font-weight-step))' });
set('lighter', { 'font-weight': 'calc(var(--nu-font-weight) - var(--nu-font-weight-step))' });

const LIST = Object.keys(MAP);

/**
 * Apply text modifiers.
 * @param {String} val - String that contains modifiers separated by space.
 */
export default function textAttr(val) {
  const { value, mods } = extractMods(val, LIST);

  if (devMode && value) {
    warn('[text] incorrect modifiers:', value);
  }

  const styles = {};

  mods.forEach(mod => {
    const modifiers = MAP[mod];
    const keys = Object.keys(modifiers);

    keys.forEach(key => {
      styles[key] = modifiers[key];
    });
  });

  if (!styles['font-weight'] && styles['--nu-font-weight']) {
    styles['font-weight'] = 'var(--nu-font-weight, inherit)';
  }

  return styles;
}

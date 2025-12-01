import { AvatarConfig } from '../types';
import { backgroundSvg } from '../components/svg/backgroundStrings';
import { skinSvg } from '../components/svg/skinStrings';
import { tshirtSvg } from '../components/svg/tshirtStrings';
import { expressionSvg } from '../components/svg/expressionStrings';
import { hairSvg } from '../components/svg/hairStrings';

const defaultConfig: AvatarConfig = {
  background: 'babyBlue',
  skin: 'softPeach',
  tshirt: 'orange',
  expression: 'happy',
  hair: 'shortBuzz'
};

/**
 * Generate full SVG string from avatar config
 */
export function generateSvg(config: Partial<AvatarConfig> = {}, size: number = 474): string {
  const merged = { ...defaultConfig, ...config };

  const background = backgroundSvg[merged.background] || '';
  const tshirt = tshirtSvg[merged.tshirt] || '';
  const skin = skinSvg[merged.skin] || '';
  const hair = hairSvg[merged.hair] || '';
  const expression = expressionSvg[merged.expression] || '';

  return `<svg width="${size}" height="${size}" viewBox="0 0 474 474" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="avatarClip"><circle cx="237" cy="237" r="237"/></clipPath></defs>${background}<g clip-path="url(#avatarClip)">${tshirt}${skin}${hair}${expression}</g></svg>`;
}

/**
 * Universal base64 encoding that works in browser and Node.js
 */
function toBase64(str: string): string {
  // Works in browser and modern Node.js (v16+)
  if (typeof btoa === 'function') {
    return btoa(unescape(encodeURIComponent(str)));
  }
  // Fallback for older Node.js
  return Buffer.from(str, 'utf-8').toString('base64');
}

/**
 * Generate base64 data URL from avatar config
 */
export function generateBase64(config: Partial<AvatarConfig> = {}, size: number = 474): string {
  const svg = generateSvg(config, size);
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

/**
 * Generate PNG base64 data URL from avatar config (browser only)
 */
export async function generatePngBase64(
  config: Partial<AvatarConfig> = {},
  size: number = 474
): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('generatePngBase64 is only available in browser environment');
  }

  const svg = generateSvg(config, size);

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      reject(new Error('Failed to load SVG image'));
    };

    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  });
}

/**
 * Download avatar as SVG file (browser only)
 */
export function downloadSvg(config: Partial<AvatarConfig> = {}, filename: string = 'avatar.svg'): void {
  if (typeof window === 'undefined') {
    throw new Error('downloadSvg is only available in browser environment');
  }

  const svg = generateSvg(config);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download avatar as PNG file (browser only)
 */
export async function downloadPng(
  config: Partial<AvatarConfig> = {},
  size: number = 474,
  filename: string = 'avatar.png'
): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('downloadPng is only available in browser environment');
  }

  const dataUrl = await generatePngBase64(config, size);

  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

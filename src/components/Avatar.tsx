import { AvatarProps, AvatarConfig, BACKGROUNDS, SKINS, TSHIRTS, EXPRESSIONS, HAIRS } from '../types';
import { backgroundComponents } from './svg/background';
import { skinComponents } from './svg/skin';
import { tshirtComponents } from './svg/tshirt';
import { expressionComponents } from './svg/expression';
import { hairComponents } from './svg/hair';

const defaultConfig: AvatarConfig = {
  background: 'babyBlue',
  skin: 'softPeach',
  tshirt: 'orange',
  expression: 'happy',
  hair: 'shortBuzz'
};

export function Avatar({
  size = 200,
  className,
  style,
  background = defaultConfig.background,
  skin = defaultConfig.skin,
  tshirt = defaultConfig.tshirt,
  expression = defaultConfig.expression,
  hair = defaultConfig.hair
}: AvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 474 474"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <clipPath id="avatarClip">
          <circle cx="237" cy="237" r="237" />
        </clipPath>
      </defs>
      {/* Background (outside clip) */}
      {backgroundComponents[background]}
      {/* Clipped content */}
      <g clipPath="url(#avatarClip)">
        {tshirtComponents[tshirt]}
        {skinComponents[skin]}
        {hairComponents[hair]}
        {expressionComponents[expression]}
      </g>
    </svg>
  );
}

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomConfig(): AvatarConfig {
  return {
    background: randomItem(BACKGROUNDS),
    skin: randomItem(SKINS),
    tshirt: randomItem(TSHIRTS),
    expression: randomItem(EXPRESSIONS),
    hair: randomItem(HAIRS)
  };
}

export { defaultConfig };

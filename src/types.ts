export type BackgroundType =
  | 'babyBlue' | 'coralRed' | 'darkGray' | 'lightGray'
  | 'mintGreen' | 'pastelGreen' | 'peach' | 'softPink';

export type SkinType =
  | 'deepBrown' | 'warmBrown' | 'mediumTan' | 'softPeach' | 'lightCream';

export type TshirtType =
  | 'amber' | 'blue' | 'charcoal' | 'green' | 'orange'
  | 'pink' | 'raspberry' | 'white' | 'yellow';

export type ExpressionType =
  | 'angry' | 'blissful' | 'content' | 'dizzy' | 'excited'
  | 'furious' | 'happy' | 'playful' | 'sad' | 'sideGlance'
  | 'skeptical' | 'sleepy' | 'suspicious' | 'wink';

export type HairType =
  | 'afroPuffs' | 'asymmetricBuns' | 'bob' | 'bobSidePart' | 'bowlCut'
  | 'braids' | 'bunnyEars' | 'curlyHeadband' | 'curlyMessy' | 'curlyPigtails'
  | 'curlyPuff' | 'fullCurly' | 'longAfro' | 'longPeak' | 'longStraight'
  | 'messyArtistic' | 'pigtailBuns' | 'shortBuns' | 'shortBuzz' | 'shortCurly'
  | 'sideBangs' | 'spaceBuns' | 'spikyEarmuffs' | 'tinyBun' | 'topKnot'
  | 'wavyCenterPart' | 'wavyPuffs';

export interface AvatarConfig {
  background: BackgroundType;
  skin: SkinType;
  tshirt: TshirtType;
  expression: ExpressionType;
  hair: HairType;
}

export interface AvatarProps extends Partial<AvatarConfig> {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface AvatarPickerProps {
  value?: AvatarConfig;
  onChange?: (config: AvatarConfig) => void;
  className?: string;
}

export const BACKGROUNDS: BackgroundType[] = [
  'babyBlue', 'coralRed', 'darkGray', 'lightGray',
  'mintGreen', 'pastelGreen', 'peach', 'softPink'
];

export const SKINS: SkinType[] = [
  'deepBrown', 'warmBrown', 'mediumTan', 'softPeach', 'lightCream'
];

export const TSHIRTS: TshirtType[] = [
  'amber', 'blue', 'charcoal', 'green', 'orange',
  'pink', 'raspberry', 'white', 'yellow'
];

export const EXPRESSIONS: ExpressionType[] = [
  'angry', 'blissful', 'content', 'dizzy', 'excited',
  'furious', 'happy', 'playful', 'sad', 'sideGlance',
  'skeptical', 'sleepy', 'suspicious', 'wink'
];

export const HAIRS: HairType[] = [
  'afroPuffs', 'asymmetricBuns', 'bob', 'bobSidePart', 'bowlCut',
  'braids', 'bunnyEars', 'curlyHeadband', 'curlyMessy', 'curlyPigtails',
  'curlyPuff', 'fullCurly', 'longAfro', 'longPeak', 'longStraight',
  'messyArtistic', 'pigtailBuns', 'shortBuns', 'shortBuzz', 'shortCurly',
  'sideBangs', 'spaceBuns', 'spikyEarmuffs', 'tinyBun', 'topKnot',
  'wavyCenterPart', 'wavyPuffs'
];

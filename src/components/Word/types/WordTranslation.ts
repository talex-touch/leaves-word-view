import { isValidPronounce, type WordPronounce } from './WordPronounce';

export interface WordTranslation {
  type: WordType;
  typeText: string;
  translation: string;
  definition: string;
  example: string;
  phonetic: string;
  audio: WordPronounce;
  frequency: number;
}

export enum WordType {
  "NOUN" = "名词",
  "VERB" = "动词",
  "ADJECTIVE" = "形容词",
  "ADVERB" = "副词",
  "PRONOUN" = "代词",
  "PREPOSITION" = "介词",
  "CONJUNCTION" = "连词",
  "INTERJECTION" = "感叹词",
}

export enum WordCodeType {
  "名词" = "NOUN",
  "动词" = "VERB",
  "形容词" = "ADJECTIVE",
  "副词" = "ADVERB",
  "代词" = "PRONOUN",
  "介词" = "PREPOSITION",
  "连词" = "CONJUNCTION",
  "感叹词" = "INTERJECTION",
}

export function isValidTranslation(translation: WordTranslation): boolean {
  if (!translation) {
    return false;
  }

  if (!translation.translation) {
    return false;
  }

  if (!translation.definition) {
    return false;
  }

  if (!translation.example) {
    return false;
  }

  if (!translation.phonetic) {
    return false;
  }

  if (!isValidPronounce(translation.audio)) {
    return false;
  }

  return true;
}

// 校验是否为合法的翻译 必须传入一个数组
export function isValidTranslationList(translation: WordTranslation[]): boolean {
  if (!Array.isArray(translation)) {
    return false;
  }

  if (translation.length === 0) {
    return false;
  }

  if (translation.length > 8) {
    return false;
  }

  return translation.every((item) => isValidTranslation(item));
}
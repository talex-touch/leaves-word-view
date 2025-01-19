export interface WordPronounce {
  content: string;
  audio: string;
  description: string;
  info: { [key: string]: string };
}

export function emptyWordPronounce(): WordPronounce {
  return {
    content: '',
    audio: '',
    description: '',
    info: {},
  };
}

export function isValidPronounce(pronounce: WordPronounce): boolean {
  return pronounce.content !== '' && pronounce.audio !== '';
}
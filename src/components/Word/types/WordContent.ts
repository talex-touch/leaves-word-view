import { WordAffixPart, WordDerived, WordExample, WordPronounce, WordTransform, WordTranslation } from './types';
import { emptyWordPronounce } from './WordPronounce';

export interface WordContent {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  britishPronounce: WordPronounce;
  americanPronounce: WordPronounce;
  derived: WordDerived[];
  img: string[];
  // thumbnail: string;
  remember: string;
  story: string;
  wordTransform: WordTransform[];
  translation: WordTranslation[];
  examplePhrases: WordExample[];
  parts: WordAffixPart[];
  backgroundStory: string;
}

export function emptyWordContent(): WordContent {
  return {
    id: 0,
    title: '',
    content: '',
    author: '',
    createdAt: new Date(),
    britishPronounce: emptyWordPronounce(),
    americanPronounce: emptyWordPronounce(),
    derived: [],
    img: [],
    // thumbnail: '',
    remember: '',
    story: '',
    wordTransform: [],
    translation: [],
    examplePhrases: [],
    parts: [],
    backgroundStory: '',
  };
}

/**
 * 传入一个文本，如果符合WordContent的格式，返回实例化后的WordContent，第二个参数表示是否解析成功
 */
export function parseWordContent(text: string): [WordContent | null, boolean] {
  try {
    const parsedData = JSON.parse(text);

    const targetContent = {
      id: parsedData.id,
      title: parsedData.title,
      content: parsedData.content,
      author: parsedData.author,
      createdAt: new Date(parsedData.createdAt),
      britishPronounce: parsedData.britishPronounce,
      americanPronounce: parsedData.americanPronounce,
      derived: parsedData.derived,
      img: parsedData.img,
      thumbnail: parsedData.thumbnail,
      remember: parsedData.remember,
      story: parsedData.story,
      wordTransform: parsedData.wordTransform,
      translation: parsedData.translation,
      examplePhrases: parsedData.examplePhrases,
      parts: parsedData.parts,
      backgroundStory: parsedData.backgroundStory,
    }

    // 检查解析后的数据是否符合 WordContent 的结构
    if (
      typeof parsedData.id === 'number' &&
      typeof parsedData.title === 'string' &&
      typeof parsedData.content === 'string' &&
      typeof parsedData.author === 'string' &&
      parsedData.createdAt instanceof Date &&
      typeof parsedData.britishPronounce === 'object' &&
      typeof parsedData.americanPronounce === 'object' &&
      Array.isArray(parsedData.derived) &&
      Array.isArray(parsedData.img) &&
      typeof parsedData.thumbnail === 'string' &&
      typeof parsedData.remember === 'string' &&
      typeof parsedData.story === 'string' &&
      Array.isArray(parsedData.wordTransform) &&
      Array.isArray(parsedData.translation) &&
      Array.isArray(parsedData.examplePhrases) &&
      Array.isArray(parsedData.parts) &&
      typeof parsedData.backgroundStory === 'string'
    ) {
      return [targetContent, true];
    } else {
      return [targetContent, false];
    }

  } catch (error) {

    return [null, false];

  }
}


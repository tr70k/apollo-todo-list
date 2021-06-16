import React, { ReactElement } from 'react';

type HighlightedText = Array<ReactElement | string>;

const getHighlightedText = (text?: string, search?: string): HighlightedText | string => {
  if (!search || !text) {
    return text || '';
  }

  const regexp = new RegExp(`${search}`, 'gi');
  const matches = Array.from(text.matchAll(regexp), m => m[0]);

  if (!matches.length) {
    return text;
  }

  return text.split(regexp).reduce((acc: HighlightedText, elem: string, index: number) => {
    if (index) {
      acc.push(<b key={index}>{matches[index - 1]}</b>);
    }
    acc.push(elem);
    return acc;
  }, []);
}

export default getHighlightedText;

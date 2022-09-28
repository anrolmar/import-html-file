import { HTML_SECTIONS } from '../types/htmlTags.constants';
import { HTML_TAGS } from './../types/htmlTags.constants';

export const isSection = (line: string): boolean => {
  if (
    line.indexOf(HTML_SECTIONS.HTML) > -1 ||
    line.indexOf(HTML_SECTIONS.BODY) > -1
  )
    return false;
  return true;
};

export const isSubsection = (type: HTML_SECTIONS): boolean => {
  if (
    type === HTML_SECTIONS.H2 ||
    type === HTML_SECTIONS.H3 ||
    type === HTML_SECTIONS.H4
  )
    return true;
  return false;
};

export const getLineInfo = (
  line: string,
  lineIndex: number,
  htmlContent: string[],
) => {
  const type: HTML_SECTIONS = getType(line);
  const { newLineIndex, content } = getContent(
    type,
    line,
    lineIndex,
    htmlContent,
  );

  return {
    type,
    content,
    newLineIndex,
  };
};

export const createHtmlSection = (type: string, body: string): string => {
  let htmlSection = '';
  switch (type) {
    case HTML_SECTIONS.H1:
      htmlSection = `${HTML_TAGS.H1.START_TAG}${body}${HTML_TAGS.H1.END_TAG}`;
      break;
    case HTML_SECTIONS.H2:
      htmlSection = `${HTML_TAGS.H2.START_TAG}${body}${HTML_TAGS.H2.END_TAG}`;
      break;
    case HTML_SECTIONS.H3:
      htmlSection = `${HTML_TAGS.H3.START_TAG}${body}${HTML_TAGS.H3.END_TAG}`;
      break;
    case HTML_SECTIONS.H4:
      htmlSection = `${HTML_TAGS.H4.START_TAG}${body}${HTML_TAGS.H4.END_TAG}`;
      break;
    default:
      htmlSection = `${HTML_TAGS.P.START_TAG}${body}${HTML_TAGS.P.END_TAG}`;
      break;
  }

  return htmlSection;
};

const getType = (line: string): HTML_SECTIONS => {
  if (line.indexOf(HTML_SECTIONS.H1) > -1) return HTML_SECTIONS.H1;
  if (line.indexOf(HTML_SECTIONS.H2) > -1) return HTML_SECTIONS.H2;
  if (line.indexOf(HTML_SECTIONS.H3) > -1) return HTML_SECTIONS.H3;
  if (line.indexOf(HTML_SECTIONS.H4) > -1) return HTML_SECTIONS.H4;
  return HTML_SECTIONS.P;
};

const getContent = (
  type: HTML_SECTIONS,
  line: string,
  lineIndex: number,
  htmlContent: string[],
) => {
  let content: string = '';

  line = line.trim();

  const startTag: string = `<${type}>`;
  const endTag: string = `</${type}>`;
  const startTagIndexOf: number = line.indexOf(startTag);

  if (startTagIndexOf > -1) {
    if (line.indexOf(endTag) > -1)
      content = line.substring(
        startTagIndexOf + startTag.length,
        line.indexOf(endTag),
      );
    else {
      let hasContent = false;
      while (!hasContent) {
        lineIndex++;
        let nextLine = htmlContent[lineIndex].trim();
        if (nextLine.indexOf(endTag) > -1) {
          content += ' ' + nextLine.substring(0, nextLine.indexOf(endTag));
          hasContent = true;
        } else {
          content += ' ' + nextLine;
        }
      }
    }
  }

  return {
    newLineIndex: lineIndex,
    content,
  };
};

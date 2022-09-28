import * as SectionRepository from './section.repository';

import { HTML_SECTIONS, HTML_TAGS } from '../types/htmlTags.constants';
import {
  createHtmlSection,
  getLineInfo,
  isSection,
  isSubsection,
} from '../utils/html.utils';

import { Section } from './section.interface';
/**
 * Required External Modules and Interfaces
 */
import { readFile } from '../utils/file.utils';

/**
 * Public Service Methods
 */
export const createSections = async (): Promise<void> => {
  try {
    const htmlString = readFile('input.html');
    const htmlContent = htmlString.split('\n');

    let lineIndex = 0;
    let lastSection;

    while (lineIndex < htmlContent.length) {
      let htmlLine = htmlContent[lineIndex];
      if (!isSection(htmlLine)) lineIndex++;
      else {
        let { type, content, newLineIndex } = getLineInfo(
          htmlLine,
          lineIndex,
          htmlContent,
        );
        lineIndex = newLineIndex;

        //if (content.length > 256) content = content.substring(0, 255);
        if (type === HTML_SECTIONS.H1) {
          await SectionRepository.createSection(type, content);
          lastSection = type;
        } else {
          const parentSection = await getLastParentSection(type, lastSection);
          if (parentSection) {
            await SectionRepository.createSection(
              type,
              content,
              parentSection.id,
            );

            if (isSubsection(type)) lastSection = type;
          } else throw Error('The section needs to have a parent');
        }

        lineIndex++;
      }
    }
  } catch (error) {
    throw error;
  }
};

export const getSections = async (excludingLevel?: number): Promise<string> => {
  let htmlSections: string[] = [
    HTML_TAGS.HTML.START_TAG,
    HTML_TAGS.BODY.START_TAG,
  ];

  const parentSections: Section[] = await SectionRepository.getParentSections();
  htmlSections = await addSections(htmlSections, parentSections);
  htmlSections = [
    ...htmlSections,
    HTML_TAGS.BODY.END_TAG,
    HTML_TAGS.HTML.END_TAG,
  ];

  return htmlSections.join('\r\n');
};

/**
 * Private Service Methods
 */

const getLastParentSection = async (
  type: HTML_SECTIONS,
  lastSection?: HTML_SECTIONS,
): Promise<Section | undefined> => {
  let lastParentSection;

  if (isSubsection(type)) {
    switch (type) {
      case HTML_SECTIONS.H2:
        lastParentSection = await SectionRepository.getLastSection(
          HTML_SECTIONS.H1,
        );
        break;
      case HTML_SECTIONS.H3:
        lastParentSection = await SectionRepository.getLastSection(
          HTML_SECTIONS.H2,
        );
        break;
      case HTML_SECTIONS.H4:
        lastParentSection = await SectionRepository.getLastSection(
          HTML_SECTIONS.H3,
        );
        break;
    }
  } else
    lastParentSection = await SectionRepository.getLastSection(lastSection);

  return lastParentSection;
};

const addSections = async (
  htmlSections: string[],
  sections: Section[],
): Promise<string[]> => {
  for (let i = 0; i < sections.length; i++) {
    htmlSections = [
      ...htmlSections,
      createHtmlSection(sections[i].header, sections[i].body),
    ];
    const childSections = await SectionRepository.getChildren(sections[i]);
    if (childSections)
      htmlSections = await addSections(htmlSections, childSections);
  }

  return htmlSections;
};

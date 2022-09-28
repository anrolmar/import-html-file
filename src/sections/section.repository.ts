import { HTML_SECTIONS } from '../types/htmlTags.constants';
import { Section } from './section.interface';
import db from '../config/knex';

export const createSection = async (
  type: HTML_SECTIONS,
  content: string,
  parentId?: number,
): Promise<void> => {
  if (!parentId) {
    await db
      .insert({
        header: type,
        body: content,
      })
      .into('sections');
  } else {
    await db
      .insert({
        header: type,
        body: content,
        parent_id: parentId,
      })
      .into('sections');
  }
};

export const getLastSection = async (tag?: HTML_SECTIONS): Promise<Section> => {
  return await db
    .table<Section>('sections')
    .where('header', tag)
    .orderBy('created_at', 'asc')
    .first<Section>();
};

export const getParentSections = async (): Promise<Section[]> => {
  return await db.table<Section>('sections').where('parent_id', null);
};

export const getChildren = async (parent: Section): Promise<Section[]> => {
  return await db.table<Section>('sections').where('parent_id', parent.id);
};

import * as SectionService from './section.service';

/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';

/**
 * Router Definition
 */
export const sectionRouter = express.Router();

/**
 * Controller Definitions
 */
sectionRouter.post('/', async (req: Request, res: Response) => {
  try {
    await SectionService.createSections();

    res.status(201).json({
      success: true,
    });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

sectionRouter.get('/', async (req: Request, res: Response) => {
  try {
    const excludingLevel = req.query.excluding
      ? Number(req.query.excluding)
      : undefined;

    const htmlSections = await SectionService.getSections(excludingLevel);

    res.status(200).json({
      success: true,
      data: {
        message: htmlSections,
      },
    });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

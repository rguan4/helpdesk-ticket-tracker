import { Request, Response, NextFunction } from 'express';
import * as statsService from './stats.service.js';

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await statsService.getStats();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getRecent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 🔴 TODO: Read the optional ?limit= query param (default 5). It must be a whole number from 1 to 10, otherwise throw a ValidationError (400). Pass it to the service.
    const rawLimit = req.query.limit;
    let limit = 5;
    if(rawLimit !== undefined) {
      const value = String(rawLimit);

      if(!/^\d+$/ .test(value)) {
        return res.status(400).json({
          success: false,
          message: "limit must be an integer between 1 and 10",
        });
      }
      limit = Number(value);

      if(limit <1 || limit > 10) {
        return res.status(400).json({
          success: false,
          message: "limit must be an integer between 1 and 10",
        })
      }
    }

    const result = await statsService.getRecent(limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

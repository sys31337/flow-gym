import { NextFunction, Request, Response } from 'express';
import Discipline from '@api/models/discipline';
import type { Details, Programs } from '@repo/types/program';
import { compareArrays } from '@api/utils';

export const createOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const payload = req.body;
    const discipline = await new Discipline(payload).save();
    return res.status(200).send(discipline);
  } catch (error) {
    return next(error);
  }
};

export const updateDiscipline = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params: { id }, body: payload } = req;
    const {
      clubIds, name, label, thumbnail, enabled,
    } = payload;
    const disciplineUpdate = await Discipline.findByIdAndUpdate(id, {
      clubIds, name, label, thumbnail, enabled,
    });
    if (!disciplineUpdate) return res.sendStatus(404);
    return res.status(200).send(disciplineUpdate);
  } catch (error) {
    return next(error);
  }
};

export const updateDisciplineProgram = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params: { id }, body: { programs: { day, details, clubId } } } = req;
    const disciplineProgram = await Discipline.findById(id);
    if (!disciplineProgram) return res.sendStatus(404);
    const filter = disciplineProgram.programs?.find((program: Programs) => (program.day === day && program.clubId.toString() === clubId));

    if (filter) {
      if ((filter.details)?.some((el: Details) => (
        el.startTime === details.startTime
        && el.endTime === details.endTime
        && el.gender === details.gender
        && compareArrays(el.ageCategories, details.ageCategories)
      ))) {
        return res.sendStatus(409);
      }
      filter.details.push(details);
      const programs = filter;
      await Discipline.findByIdAndUpdate(id, { $pull: { programs: { _id: programs._id } } });
      const update = await Discipline.findByIdAndUpdate(id, { $push: { programs } });
      return res.status(200).send(update);
    }

    const update = await Discipline.findByIdAndUpdate(id, { $push: { programs: { day, details, clubId } } });
    return res.status(200).send(update);
  } catch (error) {
    return next(error);
  }
};
export const updateProgramDetails = async (req: Request, res: Response, next: NextFunction) => {
  const { params: { progDetailId, disciplineId }, body: { day, details, clubId } } = req;
  try {
    const discipline = await Discipline.findById(disciplineId).lean();
    if (!discipline) return res.status(404).send({ msg: 'NO DISCIPLINE' });
    const foundProgram = discipline.programs?.find((program: Programs) => (program.day === day && program.clubId.toString() === clubId));
    if (!foundProgram) {
      return res.status(404).send({ msg: 'NO PROGRAM' });
    }
    const newProgramDetails = foundProgram.details.map((item: Details) => (item._id.toString() === progDetailId ? details : item));
    const newPrograms = discipline.programs?.map((item: Programs) => (foundProgram._id === item._id ? { ...item, details: newProgramDetails } : item));
    await Discipline.updateOne({ _id: disciplineId }, { programs: newPrograms });
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};
export const deleteDisciplineProgram = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { body: { programId }, params: { id } } = req;
    const update = await Discipline.findByIdAndUpdate(id, { $pull: { 'programs.$[].details': { _id: programId } } }, { new: true });
    if (!update) return res.sendStatus(404);
    return res.status(200).send(update);
  } catch (error) {
    return next(error);
  }
};

import { Request, Response } from "express";
import { Model } from "mongoose";
import Log from "../config/log.config";

const logger = new Log().getLogger();

export class ModelController {
  constructor(protected model: Model<any>) {}

  async getAll(req: Request, res: Response) {
    logger.trace("ModelController.getAll");
    try {
      const sort = req.query.sort ? JSON.parse(req.query.sort as string) : {};
      const items = await this.model.find().sort(sort);
      res.status(200).json(items);
    } catch (error) {
      throw error;
    }
  }

  async getOne(req: Request, res: Response) {
    logger.trace("ModelController.getOne");
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      throw error;
    }
  }

  async create(req: Request, res: Response) {
    logger.trace("ModelController.create");
    const item = new this.model(req.body);
    try {
      const newItem = await item.save();
      res.status(201).json(newItem);
    } catch (error) {
      throw error;
    }
  }

  async update(req: Request, res: Response) {
    logger.trace("ModelController.update");
    try {
      const updatedItem = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      throw error;
    }
  }

  async delete(req: Request, res: Response) {
    logger.trace("ModelController.delete");
    try {
      const deletedItem = await this.model.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json({ message: "Item deleted" });
    } catch (error) {
      throw error;
    }
  }

  async findBy(req: Request, res: Response) {
    logger.trace("ModelController.findBy");
    try {
      const search = req.query.search ? JSON.parse(req.query.search as string) : {};
      const sort = req.query.sort ? JSON.parse(req.query.sort as string) : {};
      const items = await this.model.find(search).sort(sort);
      res.status(200).json(items);
    } catch (error) {
      throw error;
    }
  }
}

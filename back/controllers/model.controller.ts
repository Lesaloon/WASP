import { Request, Response, NextFunction } from "express";
import { Model, ModelStatic } from "sequelize";
import Log from "../config/log.config";

const logger = new Log().getLogger();

export class ModelController {
  protected model: ModelStatic<Model>;

  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
	logger.info("ModelController.getAll");
    try {
      const items = await this.model.findAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("ModelController.getOne");
    try {
      const item = await this.model.findByPk(req.params.id);
      if (item) {
        res.json(item);
      } else {
        throw { status: 404, message: "Item not found" };
      }
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
	logger.info("ModelController.create");
    try {
      const item = await this.model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
	logger.info("ModelController.update");
    try {
      const [updatedRows] = await this.model.update(req.body, {
        where: { id: req.params.id },
      });
      if (updatedRows) {
        const updatedItem = await this.model.findByPk(req.params.id);
        res.json(updatedItem);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
	logger.info("ModelController.delete");
    try {
      const deletedRows = await this.model.destroy({
        where: { id: req.params.id },
      });
      if (deletedRows) {
        res.json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async findBy(req: Request, res: Response, next: NextFunction) {
	logger.info("ModelController.findBy");
    try {
      const whereClause = req.body;
      const items = await this.model.findAll({ where: whereClause });
      res.json(items);
    } catch (error) {
      next(error);
    }
  }
}
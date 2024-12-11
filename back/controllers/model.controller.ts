import { Request, Response } from "express";
import { Model, ModelStatic } from "sequelize";

export class ModelController {
  protected model: ModelStatic<Model>;

  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }

  async getAll(req: Request, res: Response) {
    try {
      const items = await this.model.findAll();
      res.json(items);
    } catch (error) {
      throw error;
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const item = await this.model.findByPk(req.params.id);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      throw error;
    }
  }

  async create(req: Request, res: Response) {
    try {
      const item = await this.model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      throw error;
    }
  }

  async update(req: Request, res: Response) {
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
      throw error;
    }
  }

  async delete(req: Request, res: Response) {
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
      throw error;
    }
  }

  async findBy(req: Request, res: Response) {
    try {
      const whereClause = req.body;
      const items = await this.model.findAll({ where: whereClause });
      res.json(items);
    } catch (error) {
      throw error;
    }
  }
}

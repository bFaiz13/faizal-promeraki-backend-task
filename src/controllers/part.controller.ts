import { Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreatePartDto } from "../dtos/create-part.dto";
import { createPart, addPartToInventory,addQuantityToInventory } from "../services/part.service";


export const createPartLogic = async (req: Request, res: Response) => {
  try {
    const dto = plainToClass(CreatePartDto, req.body);

    await validateOrReject(dto);

    const part = await createPart({ ...dto });
    res.status(201).json(part);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

export const addQuantityLogic = async (req: Request, res: Response) => {
  try {
    const { partId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      throw res.status(400).json({ error: "Invalid quantity" });
    }

    const result = await addQuantityToInventory(partId, quantity);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addInventoryLogic = async (req: Request, res: Response) => {
  try {
    const { partId } = req.params;
    const { quantity } = req.body;

    
    if (!quantity || quantity <= 0) {
      throw res.status(400).json({ error: "Invalid quantity" });
    }

    const result = await addPartToInventory(partId, quantity);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

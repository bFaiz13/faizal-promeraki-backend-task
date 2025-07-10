import { ObjectId } from "mongodb";
import { AppDataSource } from "../database";
import { Part } from "../models/part.entity";

const repo = AppDataSource.getRepository(Part);

export const createPart = async (data: Partial<Part>): Promise<Part> => {
  const part = repo.create(data);
  return await repo.save(part);
};

export const addQuantityToInventory = async (partId: string, quantity: number) => {
  const part = await repo.findOneBy({ _id: new ObjectId(partId) });
  console.log("Part : ", part);

  if (!part) throw new Error("Part not found");

  if (part.type === "RAW") {
    part.quantity = (part.quantity || 0) + quantity;
    await repo.save(part);
    return { status: "SUCCESS" };
  }

  throw new Error("Invalid part type");
}

export const addPartToInventory = async (partId: string, quantity: number) => {

  const part = await repo.findOneBy({ _id: new ObjectId(partId) });
  console.log("Part : ", part);

  if (!part) throw new Error("Part not found");


  if (part.type === "RAW") {
    if (part.quantity) {
      if (part.quantity === 0 || part.quantity < quantity) {
        return {
          status: "FAILED",
          message: `Insufficient quantity - ${part._id}`,
        };
      } else {
        part.quantity = (part.quantity || 0) - quantity;
        await repo.save(part);
        return { status: "SUCCESS" };
      }
    }
  }

  if (part.type === "ASSEMBLED") {
    const insufficient: string[] = [];
    for (const item of part.parts ?? []) {
      const rawParts = await repo.findOneBy({ _id: new ObjectId(item.id) });
      console.log("Checking part: ", rawParts);

      if (rawParts) {
        if (!rawParts.quantity || rawParts.quantity < item.quantity * quantity) {
          insufficient.push(item.id);
        }
      }
    };
    console.log("Insufficient parts: ", insufficient);
    

    if (insufficient.length > 0) {
      return {
        status: "FAILED",
        message: `Insufficient quantity - ${insufficient.join(", ")}`,
      };
    } else {
      // all parts sufficient: deduct
      for (const item of part.parts ?? []) {
        const rawParts = await repo.findOneBy({ _id: new ObjectId(item.id) });
        if (rawParts && rawParts.quantity) {
          rawParts.quantity -= item.quantity * quantity;
          await repo.save(rawParts);
        }
      }

      part.quantity = (part.quantity || 0) + quantity;
      await repo.save(part);
      return { status: "SUCCESS" };
    }

  }

  throw new Error("Invalid part type");
};

// {
// "name": "Bolt",
// "type": "RAW"
// }

// {
//   "name": "Gearbox",
//     "type": "ASSEMBLED",
//       "parts": [
//         { "id": "6868f5ced8de67f1f533bf01", "quantity": 1000 }
// 	{ "id": "shaft-1", "quantity": 2 }
//       ]
// }


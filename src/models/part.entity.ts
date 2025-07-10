import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class Part {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  type: "RAW" | "ASSEMBLED";

  @Column({ default: 0 })
  quantity?: number;

  @Column({ nullable: true })
  parts?: { id: string; quantity: number }[];
}

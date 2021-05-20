import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('coffees')
@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // set to json temporarily, soon we will handle relationships
  @Column('json', { nullable: true })
  flavors: string[];
}

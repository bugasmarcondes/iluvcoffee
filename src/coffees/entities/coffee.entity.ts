import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  // if the name of the property is changed, then migrations will delete the column, create a new column, and all the data in that will be lost
  // that's why we can leverage the use of the migration file to specify how to apply the Up and Down the changes into the DB
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // @JoinTable() specifies the owner side of the relationship, in this case is the coffee entity
  // Each coffee can have multiple flavors, so we'll be using many-to-many
  @JoinTable()
  // (type) => Flavor, function that return a reference to the related entity
  // (flavor) => flavor.coffees, specify the name of the property that references the Coffee entity inside the Flavor entity
  // cascade: true, flavors that belong to a newly created coffee will be automatically inserted into the db
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    cascade: true,
  })
  flavors: Flavor[];
}

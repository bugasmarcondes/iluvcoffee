import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// composite index
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // single index
  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}

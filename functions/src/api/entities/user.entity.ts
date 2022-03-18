import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Barber, Client } from '.';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  uid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => Client, (client) => client.user)
  client?: Client;

  @OneToOne(() => Barber, (barber) => barber.user)
  barber?: Barber;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedat?: Date;

  constructor(uid: string, name: string, email: string) {
    super();
    this.uid = uid;
    this.name = name;
    this.email = email;
  }
}

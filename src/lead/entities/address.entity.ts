import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Lead } from 'src/lead/entities/lead.entity';
import { EStatus } from 'src/lead/enums/status.enum';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => Lead)
  @JoinColumn({ name: 'lead_id', referencedColumnName: 'id' })
  lead: Lead;

  @Column({ name: 'zip_code' })
  public zipCode: string;

  @Column({ name: 'street' })
  public street: string;

  @Column({ name: 'number' })
  public number: string;

  @Column({ name: 'complement' })
  public complement: string;

  @Column({ name: 'neighborhood' })
  public neighborhood: string;

  @Column({ name: 'city' })
  public city: string;

  @Column({ name: 'state' })
  public state: string;

  @Column({ name: 'status' })
  public status: EStatus;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}

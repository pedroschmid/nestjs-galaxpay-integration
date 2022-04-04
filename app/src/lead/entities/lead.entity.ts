import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Address } from 'src/lead/entities/address.entity';

import { ILeadEntity } from 'src/lead/interfaces/lead-entity.interface';

import { ESubscriptionTier } from 'src/lead/enums/subscription-status.enum';
import { EStatus } from 'src/lead/enums/status.enum';

@Entity({ name: 'leads' })
export class Lead implements ILeadEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'email' })
  public email: string;

  @Column({ name: 'phone' })
  public phone: number;

  @Column({ name: 'identifier' })
  public identifier: string;

  @Column({ name: 'subscription_tier' })
  public subscriptionTier: ESubscriptionTier;

  @Column({ name: 'status' })
  public status: EStatus;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}

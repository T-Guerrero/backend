import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact, Profile } from 'domain/profile';

@Entity()
@Index(['email'], { unique: true })
@Index(['cpf'], { unique: true })
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  dayOfSecondShot?: string;

  @Column({ nullable: true })
  cpf?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true, default: JSON.stringify([]) })
  services!: string;

  static serialize(p: Profile): ProfileEntity {
    const profileEntity = new ProfileEntity();
    profileEntity.name = p.name;
    profileEntity.dayOfSecondShot = p.dayOfSecondShot
      ? p.dayOfSecondShot.toISOString()
      : undefined;
    profileEntity.cpf = p.cpf || undefined;
    profileEntity.email = p.contact.email || undefined;
    profileEntity.phone = p.contact.phone?.join(';') || undefined;
    profileEntity.address = p.contact.address;
    profileEntity.services = JSON.stringify(p.phone?.join(';') || []);
    return profileEntity;
  }

  static deserialize(profileEntity: ProfileEntity): Profile {
    const name = profileEntity.name;
    const cpf = profileEntity.cpf || null;
    const contact: Contact = {
      address: profileEntity.address,
      email: profileEntity.email,
      phone: profileEntity.phone?.split(';'),
    };

    const p = new Profile(name, cpf, contact);
    p.services = JSON.parse(profileEntity.services);

    return p;
  }
}

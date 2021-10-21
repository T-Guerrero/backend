import { Authorizer } from './Authorizer';
import { IProfileDataPort } from './ports/profileDataPort';
import { Contact, Profile } from './profile';

export interface PreRegistrationData {
  name: string;
  cpf?: string;
  contact: Contact;
  dayOfSecondShot?: Date;
}

export default class ProfileUseCases {
  constructor(private readonly profileDataPort: IProfileDataPort) {}

  @Authorizer.allow(['user'])
  public performPreRegistration({
    name,
    cpf,
    contact,
    dayOfSecondShot,
  }: PreRegistrationData): Promise<Profile> {
    const profile = new Profile(name, cpf, contact);
    if (dayOfSecondShot) {
      profile.dayOfSecondShot = dayOfSecondShot;
    }
    return this.profileDataPort.save(profile);
  }
}

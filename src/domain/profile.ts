import { InvalidSecondShotDateError } from './exceptions/InvalidSecondShotDateError';

export interface Contact {
  email?: string;
  phone?: string[];
  address?: string;
}

export class Profile {
  public services: string[] = [];
  public responsibleForValidation = '';
  private _dayOfSecondShot: Date | null = null;

  constructor(
    public name: string,
    public cpf: string | null = null, // TODO: validate in the future
    private _contact: Contact = {}
  ) {}

  public set phone(phone: string[]) {
    this._contact.phone = phone;
  }

  public set email(email: string) {
    this._contact.email = email;
  }

  public set address(address: string) {
    this._contact.address = address;
  }

  public get contact(): Contact {
    return this._contact;
  }

  public set dayOfSecondShot(dayOfSecondShot: Date | null) {
    if (!dayOfSecondShot || dayOfSecondShot.getTime() >= Date.now()) {
      throw new InvalidSecondShotDateError();
    }

    this._dayOfSecondShot = dayOfSecondShot;
  }

  public get dayOfSecondShot(): Date | null {
    return this._dayOfSecondShot;
  }
}

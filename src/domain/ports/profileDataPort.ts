import { Profile } from '../profile';

export interface IProfileDataPort {
  save: (profile: Profile) => Promise<Profile>;
}

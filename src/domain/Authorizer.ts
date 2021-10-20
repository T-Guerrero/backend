import { UnauthorizedError } from './exceptions/UnauthorizedError';
import { Profile } from './profile';

export class Authorizer {
  static allow(list: string[]) {
    return (_: any, __: string, descriptor: PropertyDescriptor) => {
      const origin = descriptor.value;
      descriptor.value = async function (...args: any[]) {
        const profile: Profile = args[0];
        const authorized = profile?.roles.some((role) => list.includes(role));

        if (!(profile instanceof Profile))
          throw new SyntaxError(
            'First argument must be an instance of Profile'
          );
        if (!authorized) throw new UnauthorizedError(profile.roles);

        await origin.apply(this, args);
      };
    };
  }
}

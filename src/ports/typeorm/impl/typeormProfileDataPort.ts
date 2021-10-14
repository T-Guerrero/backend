import {
  TextSearchableQueryParams,
  TextSearchableQuery,
} from 'common/pagedQuery';
import { IProfileDataPort } from 'domain/ports/profileDataPort';
import { Profile } from 'domain/profile';
import { Connection, ILike } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';

export class TypeORMProfileDataPort implements IProfileDataPort {
  constructor(connection: Connection) {
    ProfileEntity.useConnection(connection);
  }
  save: (profile: Profile) => Promise<Profile> = async (p) => {
    let entity = ProfileEntity.serialize(p);
    entity = await entity.save();
    return ProfileEntity.deserialize(entity);
  };
  findByText: (
    params: TextSearchableQueryParams
  ) => Promise<TextSearchableQuery<Profile>> = async ({ q, skip, take }) => {
    return {
      data: await ProfileEntity.find({
        where: {
          name: ILike(`%${q}%`),
        },
        skip,
        take,
      }).then((result) => result.map(ProfileEntity.deserialize)),
      q,
      skip,
      take,
    };
  };
}

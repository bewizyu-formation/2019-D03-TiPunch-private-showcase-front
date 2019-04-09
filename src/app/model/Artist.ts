import {User} from './User';

export class Artist {

  constructor(
    public id: number,
    public nameArtist: string,
    public mailArtist: string,
    public cityArtist: string,
    public descriptionArtist: string,
    public noteArtist: string,
    public nbVotes: string,
    public users: Array<User>
  ) {
  }
}

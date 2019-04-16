import {User} from './User';

export class Artist {

  constructor(
    public id: number,
    public nameArtist: string,
    public contactMail: string,
    public cityArtist: string,
    public descriptionArtist: string,
    public noteArtist: string,
    public nbVotes: string,
    public users: Array<User>,
    public departements: Array<string>,
    public urlSiteArtist: string,
    public shortDescriptionArtist: string,
    public urlImage: string,
    public contactPhone: string
  ) {
  }
}

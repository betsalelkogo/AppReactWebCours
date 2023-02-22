export class Post {
  constructor(userId: string, date: Date, text: string, avatarUri: string) {
    this.userId = userId;
    this.text = text;
    this.date = date;
    this.avatarUri = avatarUri;
  }
  public userId?: String;
  public date?: Date | String;
  public text?: String;
  public avatarUri?: String;
}


export class MenuItem {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public imageUrl: string,
    public active = true,
  ) {}
}
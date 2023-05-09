type Restaurant = {
  id: number
  name: string
  description: string
  address: string
}

export type RestaurantResponse = {
  restaurants: Restaurant[]
}

export class MenuItem {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public imageUrl: string,
    public active = true,
  ) {}
}

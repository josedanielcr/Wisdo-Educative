export class MenuOptionClient {
    public id: number;
    public name: string;
    public description: string;
    public isParent: boolean;
    public icon: string;
    public path: string;
    public status: string;
  
    constructor(
      id: number,
      name: string,
      description: string,
      isParent: boolean,
      icon: string,
      path: string,
      status: string
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.isParent = isParent;
      this.icon = icon;
      this.path = path;
      this.status = status;
    }
}
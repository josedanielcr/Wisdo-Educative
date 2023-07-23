export class InterestServer {
  id: number;
  name: string;
  status: string | null;

  constructor(id: number, name: string, status: string | null) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}
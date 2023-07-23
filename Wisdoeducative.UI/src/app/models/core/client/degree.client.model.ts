export class DegreeClient {
  id: number;
  name: string;
  studyField: string | null;
  type: string | null;
  status: string | null;

  constructor(id: number, name: string, studyField: string | null, type: string | null, status: string | null) {
    this.id = id;
    this.name = name;
    this.studyField = studyField;
    this.type = type;
    this.status = status;
  }
}

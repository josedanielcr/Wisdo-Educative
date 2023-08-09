export class GrandingSystemClient {
    id: number;
    name: string;
    description: string;
    minimumScore: string;
    maximiumScore: string;
    passingGrade: string;
    status: string;

    constructor(id: number, name: string, description: string, minimumScore: string, maximiumScore: string, passingGrade: string, status: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.minimumScore = minimumScore;
        this.maximiumScore = maximiumScore;
        this.passingGrade = passingGrade;
        this.status = status;
    }
}
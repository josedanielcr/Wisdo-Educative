export class ChipModel {
    public id : number;
    public name : string;
    public code : string;
    public selected : boolean;

    constructor(id : number, name : string, selected : boolean, code : string) {
        this.id = id;
        this.name = name;
        this.selected = selected;
        this.code = code;
    }
}
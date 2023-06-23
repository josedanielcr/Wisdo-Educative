export class ChipModel {
    public id : number;
    public name : string;
    public selected : boolean;

    constructor(id : number, name : string, selected : boolean) {
        this.id = id;
        this.name = name;
        this.selected = selected;
    }
}
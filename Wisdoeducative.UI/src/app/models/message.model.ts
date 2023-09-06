import { MessageTypeEnum } from "../enums/message.type.enum";

export class MessageModel {
    public type : MessageTypeEnum;
    public title : string;
    public text : string;

    constructor(type : MessageTypeEnum, title : string, text : string) {
        this.type = type;
        this.title = title;
        this.text = text;
    }
}
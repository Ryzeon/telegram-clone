export class Message {
    userId: string;
    type: string;
    text: string;
    date: string

    constructor(userId: string, type: string, text: string, date: string) {
        this.userId = userId;
        this.type = type;
        this.text = text;
        this.date = date;
    }
}
export class User {
    photo: string;
    name: string;
    userId: string;
    date: string;

    constructor(photo: string, name: string, userId: string, date: string) {
        this.photo = photo;
        this.name = name;
        this.userId = userId;
        this.date = date;
    }
}
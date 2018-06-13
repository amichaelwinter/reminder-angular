class Reminder {
    _id:string;
    title: string;
    description: string;
    date: Date;
    endDate: Date;

    constructor() {
        this.title = ""
        this.description = ""
        this.date = new Date()
    }

}



export default Reminder;

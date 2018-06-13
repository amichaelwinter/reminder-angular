class Reminder {
    _id:string;
    title: string;
    description: string;
    date: Date;
    endDate: Date;
    status: string;

    constructor() {
        this.title = ""
        this.description = ""
        this.date = new Date()
        this.endDate = ""
        this.status = ""
    }

}



export default Reminder;

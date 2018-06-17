import { Response } from '@angular/http';
import { ReminderService } from './services/reminder.service';
import Reminder from './models/reminder.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    //Private reminder service will be injected into the component by Angular Dependency Injector
    private reminderService: ReminderService
  ) { }

  //Declaring the new reminder Object and initilizing it
  public newReminder: Reminder = new Reminder()

  //An Empty list for the visible reminder list
  reminderList: Reminder[];
  editReminderList: Reminder[] = [];


  ngOnInit(): void {

    //At component initialization the
    this.reminderService.getReminders()
      .subscribe(reminders => {
        //assign the remidnerList property to the proper http response
        this.reminderList = reminders
        console.log(reminders)
      })
  }

  create() {

    // Set the end date to 2 weeks following the today's date ()
    var currentDate = new Date()
    this.newReminder.endDate = new Date();
    this.newReminder.endDate.setDate(currentDate.getDate() + 14)

    this.reminderService.createReminder(this.newReminder)
      .subscribe((res) => {
        this.reminderList.push(res.data)
        this.newReminder = new Reminder()
      })
  }

  editReminder(reminder: Reminder) {

    console.log(reminder)

    if(this.reminderList.includes(reminder)){

      if(!this.editReminderList.includes(reminder)){

        this.editReminderList.push(reminder)
      }else{

        this.editReminderList.splice(this.editReminderList.indexOf(reminder), 1)

        this.reminderService.editReminder(reminder).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editReminder(reminder)
          console.error('Update Unsuccesful')
        })
      }
    }
  }



    submitReminder(event, reminder:Reminder){
        if(event.keyCode ==13){
          this.editReminder(reminder)
        }
      }

    deleteReminder(reminder: Reminder) {

      this.reminderService.deleteReminder(reminder._id).subscribe(res => {

        console.log(res);

        this.reminderList.splice(this.reminderList.indexOf(reminder), 1);
      })
    }

}

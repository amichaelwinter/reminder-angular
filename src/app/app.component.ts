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
    //Private todoservice will be injected into the component by Angular Dependency Injector
    private reminderService: ReminderService
  ) { }

  //Declaring the new todo Object and initilizing it
  public newReminder: Reminder = new Reminder()

  //An Empty list for the visible todo list
  reminderList: Reminder[];
  editReminderList: Reminder[] = [];


  ngOnInit(): void {

      console.log("------On It")

    //At component initialization the
    this.reminderService.getReminders()
      .subscribe(reminders => {
        //assign the todolist property to the proper http response
        this.reminderList = reminders
        console.log("------On It")
        console.log(reminders)
      })
  }

  create() {
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

  doneReminder(reminder:Reminder){
      reminder.status = 'Done'
      this.reminderService.editReminder(reminder).subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        this.editReminder(reminder)
        console.error('Update Unsuccesful')
      })
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

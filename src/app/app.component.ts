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
}

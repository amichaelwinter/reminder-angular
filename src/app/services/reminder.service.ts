
import Reminder from '../models/reminder.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

//RxJS operator for mapping the observable
import 'rxjs/add/operator/map';

@Injectable()
export class ReminderService {

  api_url = 'http://localhost:3000';
  reminderUrl = `${this.api_url}/api/reminders`;

  constructor(
    private http: HttpClient
  ) { }


  //Create remidner, takes a Remidner Object
  createReminder(reminder: Reminder): Observable<any>{
    //returns the observable of http post request
    return this.http.post(`${this.reminderUrl}`, reminder);
  }

  //Read reminder, takes no arguments
  getReminders(): Observable<Reminder[]>{

    console.log("Service Get Reminders called")

    return this.http.get(this.reminderUrl)
    .map(res  => {
      //Maps the response object sent from the server
      console.log("Reminder Service - getReminders ");
      console.log(res)

      return res["data"].docs as Reminder[];
    })
  }
  //Update Remidner, takes a Reminder Object as parameter
  editReminder(reminder:Reminder){
    let editUrl = `${this.reminderUrl}`
    //returns the observable of http put request
    return this.http.put(editUrl, reminder);
  }

  deleteReminder(id:string):any{
    //Delete the object by the id
    console.log("Reminder Service Deleting");
    let deleteUrl = `${this.reminderUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      console.log("Reminder Service Delete Response");
      console.log(res);
      return res;
    })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

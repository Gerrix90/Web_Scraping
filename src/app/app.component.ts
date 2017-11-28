import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: Item[];

  constructor(private _dataService: DataService) {

    this._dataService.getUsers()
      .subscribe(res => this.items = res);

  }

}

interface Item {

id : number;
title : string;
url : string; 

}

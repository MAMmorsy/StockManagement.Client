import { Component } from '@angular/core';
import { StockService } from '../Services/stocks.service';
import { Stocks } from './Interfaces/Stocks';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  stocks: Stocks[] = [];
  title = 'Stock List';
  showDiv: boolean = false;
  error: string = '';

  constructor(public stockServices: StockService, private http: HttpClient) {}
}

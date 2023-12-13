import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stocks } from '../Interfaces/Stocks';
import { StockService } from '../../Services/stocks.service';
import { ConfigService } from 'src/Services/config.service';
import { Router } from '@angular/router';
import { Response, Error } from '../../app/Interfaces/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  config: any;
  private baseUrl = '';
  allStocksResponse: Response<Stocks[]> | undefined;
  stockResponse: Response<Stocks> | undefined;
  stocks: Stocks[] = [];
  title = 'Stock List';
  showDiv: boolean = false;
  error: string = '';

  constructor(
    public stockServices: StockService,
    private http: HttpClient,
    private cofigServices: ConfigService,
    private _router: Router
  ) {
    this.config = cofigServices.loadJSON('./assets/config.json');
    this.baseUrl = this.config['API_URL'];
  }

  ngOnInit() {
    this.stockServices.startConnection();
    this.stockServices.addTransferDataListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get(`${this.baseUrl}/Stocks/GetAllStocks`).subscribe(
      (res) => {
        console.log(res);
      },
      (errCode) => {
        console.log(errCode.message);
        this.error = errCode.message;
        this._router.navigate(['/error']);
      }
    );
  };
}

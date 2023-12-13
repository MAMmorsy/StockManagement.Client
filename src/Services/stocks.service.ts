import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Stocks } from '../app/Interfaces/Stocks';
import { ConfigService } from './config.service';
import * as signalR from '@microsoft/signalr';
import { Response, Error } from '../app/Interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  data: Stocks[] = [];
  stock!: Stocks;
  private hubConnection!: signalR.HubConnection;
  config: any;
  private baseUrl: string;
  private options = {
    headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),
  };

  constructor(private http: HttpClient, private cofigServices: ConfigService) {
    this.config = cofigServices.loadJSON('./assets/config.json');
    this.baseUrl = this.config['API_URL'];
  }
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/stocks`)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferDataListener = () => {
    this.hubConnection.on('transferstockdata', (response) => {
      this.data = response;
      console.log(response);
    });
  };

  public getStocks = (): Observable<Stocks[]> => {
    return this.http
      .get<Stocks[]>(`${this.baseUrl}/Stocks/SelectAllStocks`, this.options)
      .pipe(map((response: any) => response.data));
  };

  public getStocksByStockId = (stockId: number): Observable<Stocks> => {
    return this.http
      .get<Stocks>(
        `${this.baseUrl}/Stocks/GetStockById?stockId=` + stockId,
        this.options
      )
      .pipe(map((response: any) => response.data));
  };
}

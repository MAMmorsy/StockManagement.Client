import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { NewOrder } from 'src/app/Interfaces/NewOrder';
import { OrderList } from 'src/app/Interfaces/OrdersList';
import { ConfigService } from 'src/Services/config.service';
import { Response, Error } from '../app/Interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  config: any;
  data: OrderList[] = [];
  // allOrdersResponse: Response<OrderList[]> | undefined;
  // saveResponse: Response<boolean> | undefined;
  private baseUrl = '';
  constructor(private http: HttpClient, private cofigServices: ConfigService) {
    this.config = cofigServices.loadJSON('./assets/config.json');
    this.baseUrl = this.config['API_URL'];
  }

  public getOrders = (): Observable<OrderList[]> => {
    return this.http
      .get<OrderList[]>(`${this.baseUrl}/Orders`, this.options)
      .pipe(map((response: any) => response.data));
  };

  private options = {
    headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),
  };

  public AddOrder(order: NewOrder): Observable<NewOrder> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(order);
    return this.http.post<NewOrder>(`${this.baseUrl}/Orders`, body, {
      headers: headers,
    });
  }
}

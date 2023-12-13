import { Component, OnInit } from '@angular/core';
import { OrderList } from '../Interfaces/OrdersList';
import { OrdersService } from 'src/Services/orders.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public orderList: OrderList[] = [];
  title = 'Order List';
  error: string = '';
  constructor(
    public orderService: OrdersService,
    private http: HttpClient,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (orderList) => {
        this.orderList = orderList;
      },
      (errCode) => {
        console.log(errCode.message);
        this.error = errCode.message;
        this._router.navigate(['/error']);
      }
    );
  }
}

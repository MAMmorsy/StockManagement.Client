import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from 'src/Services/orders.service';
import { NewOrder } from '../Interfaces/NewOrder';
import { Stocks } from '../Interfaces/Stocks';
import { StockService } from 'src/Services/stocks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit {
  error: string = '';
  selectedStockPrice: number | undefined;
  stocks: Stocks[] = [];
  selectedStockId: number = 0;
  formOrder!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private ordersService: OrdersService,
    private stockService: StockService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.formOrder = this._fb.group({
      stockId: '',
      price: '',
      quantity: '',
      personName: '',
    });

    this.getStocks();
  }

  onChange(selectedStockId: any) {
    this.getStocksByStockId(selectedStockId);
  }

  getStocks() {
    this.stockService.getStocks().subscribe(
      (data) => {
        this.stocks = data;
        this.selectedStockId = this.stocks[0].stockId;
        this.selectedStockPrice = this.stocks[0].price;
      },
      (errCode) => {
        console.log(errCode.message);
        this.error = errCode.message;
        this._router.navigate(['/error']);
      },
      () => console.log('Get all complete')
    );
  }

  getStocksByStockId(stockId: number) {
    this.stockService.getStocksByStockId(stockId).subscribe(
      (response) => {
        this.selectedStockPrice = response.price;
      },
      (error) => console.log(error),
      () => console.log('Get all complete')
    );
  }
  onSubmit(order: NewOrder) {
    order.stockId = this.selectedStockId;
    if (order.quantity < 1) {
      this.error = 'Please enter quantity!';
    } else if (order.personName === '') {
      this.error = 'Please enter Person Name!';
    } else {
      this.ordersService.AddOrder(order).subscribe(
        (response) => {
          this._router.navigateByUrl('/orderList');
        },
        (errCode) => {
          console.log(errCode.message);
          this.error = errCode.message;
          this._router.navigate(['/error']);
        }
      );
    }
  }
}

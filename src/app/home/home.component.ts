import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { IProduct } from "../_shared/services/products";
import { ProductsService } from "../_shared/services/products.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageTitle: string = 'Category';
  errorMessage: string = '';
  sub: Subscription | any;

  products: IProduct[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.sub = this.productsService.getProducts().subscribe({
      next: products => {
        this.products = products; //shows in the same order it is in the products.json
      },
      error: err => this.errorMessage = err
    });
    //this.listFilter = 'cart';
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

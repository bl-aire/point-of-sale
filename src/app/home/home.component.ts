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
  
  private _listFilter:string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productsService: ProductsService) { }

  performFilter(filterBy: string):IProduct[]{
    filterBy = filterBy.toLocaleLowerCase(); //so its not case sensitive
    return this.products.filter((product: IProduct) =>
    product.name.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.sub = this.productsService.getProducts().subscribe({
      next: products => {
        this.products = products; //shows in the same order it is in the products.json
      },
      error: err => this.errorMessage = err
    });

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

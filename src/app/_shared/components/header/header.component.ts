import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { IProduct } from "../../services/products";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  hidden = false;
  errorMessage: string = '';
  sub: Subscription | any;
  private _listFilter:string = '';

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
 
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
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    //this.listFilter = 'cart';
  }

}

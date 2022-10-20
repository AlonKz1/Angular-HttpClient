import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ProductsListService } from 'src/app/core/services/products-list.service';
import { SearchService } from 'src/app/core/services/search.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(
    private searchService: SearchService,
    private productsService: ProductsListService,
    private formBuilder: FormBuilder
  ) {}

  searchResult: string = '';
  productsList!: Observable<Product[]>;
  categoryForm!: FormControl;
  valueSelected!: string | null;
  counter$!: Observable<number>;
  categories: string[] = [];

  ngOnInit(): void {
    console.log('List on');
    this.productsList = this.productsService.products$;
    this.counter$ = this.productsService.products$.pipe(
      map((list) => list.length)
    );
    this.productsService.products$.subscribe((list) => {
      list.map((p) => {
        if (!this.categories.includes(p.category)) {
          this.categories.push(p.category);
        }
      });
    });
    if (this.valueSelected) this.chooseCategory(this.valueSelected);
  }

  ngOnDestroy(): void {
    this.valueSelected = null;
  }

  async deleteProduct(id: number) {
    try {
      await this.productsService.deleteProduct(id);
      alert('Deleted');
    } catch (err) {
      console.log(err);
      alert('Cannot Delete Product');
    }
  }

  chooseCategory(category: string) {
    this.productsService.getProductsByCategory(category);
  }

  getAllProducts() {
    this.valueSelected = null;
    this.productsService.loadProducts();
  }
}

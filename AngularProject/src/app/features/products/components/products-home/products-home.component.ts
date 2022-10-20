import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsListService } from 'src/app/core/services/products-list.service';
import { SearchService } from 'src/app/core/services/search.service';
import { SearchComponent } from 'src/app/shared/components/search/search.component';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {

  constructor(private productsService: ProductsListService) { }

  searchResult: string = ""

  ngOnInit(): void {
    this.productsService.loadProducts();
  }
}

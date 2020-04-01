import { Component, OnInit, OnDestroy } from './node_modules/@angular/core';
import { ProductService as ProductService } from './node_modules/src/app/services/product.service';
import { ActivatedRoute, Router } from './node_modules/@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-definition',
  templateUrl: './app-product-definition.component.html',
  styleUrls: ['./app-product-definition.component.scss']
})
export class ProductDefinitionComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }
  
  product: Product = {
    id: 0,
    name: '',
  };

  isNew: boolean = true;
  private routeSub: Subscription;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('id: ', id);
      this.isNew = +id === 0;
      console.log('isNew ', this.isNew);

      if (!this.isNew) {
        this.productService.Get(id).subscribe(data => {
          this.product = data;
        });
      }
    });
  } 

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  save() {
    this.productService.Add(this.product).subscribe(newlyCreatedId => {
      if (newlyCreatedId > 0) {
        this.router.navigate(['/definition', newlyCreatedId ]);
      }
    });
  }
}

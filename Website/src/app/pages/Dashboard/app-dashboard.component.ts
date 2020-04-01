import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { faFolderOpen, faEdit, faPlus, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';
import { BsModalService } from 'ngx-bootstrap';
import { ModalComponent } from 'src/app/components/modal/app-modal.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faFolderOpen: IconDefinition = faFolderOpen;
  faEdit: IconDefinition = faEdit;
  faPlus: IconDefinition = faPlus;
  faTrashAlt: IconDefinition = faTrashAlt;

  isLoading = false;
  isAdmin = false;

  constructor(private router: Router,
    private modalService: BsModalService,
    private authService: AuthenticationService,
    private productService: ProductService) { }

  ngOnInit(): void {
    const loadTimeout = setTimeout(() => this.isLoading = true, 1000);
    
    this.isAdmin = this.authService.isAdmin;

    this.productService.GetAll()
    .pipe(untilDestroyed(this))
    .subscribe(data => {
      const array = data;
      this.dataSource = new MatTableDataSource(array);
      clearTimeout(loadTimeout);
      this.isLoading = false;
    });
  }

  dataSource: MatTableDataSource<Product>;

  displayedColumns: string[] = ['name', 'counterpartyType', 'level', 'action'];

  addNewProduct() {
    this.router.navigate(['/definition', 0]);
  }

  onDeleteProduct(id: number) {
    const initialState = {
      title: 'Usuwanie produktu',
      message: 'Czy jesteś pewien, że chcesz usunąć produkt?',
      confirmAction: () => this.deleteProduct(id)
    };

    this.modalService.show(ModalComponent, { initialState });
  }

  deleteProduct(id) {
    this.productService.Delete(id).subscribe(result =>
      this.productService.GetAll().subscribe(data => {
        const array = data;
        this.dataSource = new MatTableDataSource(array);
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    console.log(sort);
    const isAsc = sort.direction === 'asc' ? 1 : -1;
    let sortedData = [];

    if (sort.active === 'name') {
      sortedData = this.dataSource.data.sort((a, b) => {
        return this.compareStrings(a.name, b.name, isAsc)
      })
    }

    this.dataSource.data = sortedData;
  }

  compareStrings(a: string, b: string, isAsc: number) {
    return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * isAsc;
  }

  onRowClick(id: string) {
    const userIsAdmin = false;

    if (userIsAdmin) {
      this.router.navigate(['/definition', id]);
    } else {
      this.router.navigate(['/product', id]);
    }

  }
}

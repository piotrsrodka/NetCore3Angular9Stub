import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faFolderOpen, faEdit, faPlus, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BsModalService } from 'ngx-bootstrap';
import { ModalComponent } from 'src/app/components/modal/app-modal.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Sort } from '@angular/material/sort';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  faFolderOpen: IconDefinition = faFolderOpen;
  faEdit: IconDefinition = faEdit;
  faPlus: IconDefinition = faPlus;
  faTrashAlt: IconDefinition = faTrashAlt;

  isLoading = false;
  dataSource: MatTableDataSource<User>;

  displayedColumns: string[] = ['email', 'name', 'role', 'isActive', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router,
    private modalService: BsModalService,
    private userService: UserService) {

  }
  ngOnDestroy(): void {
    //
  }

  ngOnInit() {
    const loadTimeout = setTimeout(() => this.isLoading = true, 1000);

    this.userService.GetAll()
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        const array = data;
        this.dataSource = new MatTableDataSource(array);
        clearTimeout(loadTimeout);
        this.isLoading = false;
      });
  }

  addNewUser() {
    this.router.navigate(['/user', 0]);
  }

  onDeleteUser(id: number) {
    const initialState = {
      title: 'Usuwanie konta użytkownika',
      message: 'Czy jesteś pewien, że chcesz usunąć konto użytkownika?',
      confirmAction: () => this.deleteUser(id)
    };

    this.modalService.show(ModalComponent, { initialState });
  }

  deleteUser(id) {
    this.userService.Delete(id).subscribe(result =>
      this.userService.GetAll().subscribe(data => {
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
      this.router.navigate(['/user', id]);
    }
  }
}

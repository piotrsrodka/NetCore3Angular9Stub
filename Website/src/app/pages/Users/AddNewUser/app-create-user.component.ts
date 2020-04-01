import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-create-user',
  templateUrl: './app-create-user.component.html',
  styleUrls: ['./app-create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  
  isUserNameValid: boolean = true;
  repeatPasswordField: string = '';
  passwordsMatch: boolean = true;
  isNew: boolean = true;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }
  
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'Client',
    isActive: true
  };

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('id: ', id);
      this.isNew = +id === 0;
      console.log('isNew ', this.isNew);

      if (!this.isNew) {
        this.userService.Get(id).subscribe(data => {
          this.user = data;
        });
      }
    });
  } 

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  
  get role() { return Role; }

  checkUserName() {
    this.isUserNameValid = this.user.name != '';
  }

  onRepeatPassChange() {
    this.passwordsMatch = this.user.password === this.repeatPasswordField;
  }

  isActiveChange() {
    this.user.isActive = !this.user.isActive;
  }

  cancel() {
    this.router.navigate(['/users']);
  }

  isSaveDisabled(): boolean {
    return !this.passwordsMatch || this.user.name === '' || this.user.password === '' || this.user.email === '';
  }

  save() {
    if (this.isNew && (this.user.password === '' || this.user.password !== this.repeatPasswordField)) {
      this.passwordsMatch = false;
      return;
    }

    this.userService.Add(this.user).subscribe(newlyCreatedId => {
      if (newlyCreatedId > 0) {
        this.router.navigate(['/users']);
      }
    });
  }
}

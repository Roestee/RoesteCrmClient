import { Component, signal } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { LoginResponseModel } from '../../models/login.response.model';
import { SharedModule } from '../../modules/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  model: LoginModel = new LoginModel();

  constructor(private http: HttpService, private router: Router) {}

  signIn() {
    this.http.post<LoginResponseModel>('Auth/Login', this.model, (res) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/');
    });
  }

  hidePassword = signal(true);
  clickEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }
}

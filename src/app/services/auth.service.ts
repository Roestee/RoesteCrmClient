import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Menus } from '../menu';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';
  user: UserModel = new UserModel();
  menus = Menus;

  constructor(private router: Router) {}

  isAuthenticated() {
    this.token = localStorage.getItem('token') ?? '';
    if (this.token === '') {
      this.router.navigateByUrl('/login');
      return false;
    }

    const decode: JwtPayload | any = jwtDecode(this.token);
    const exp = decode.exp;
    const now = new Date().getTime() / 1000;

    if (now > exp) {
      this.router.navigateByUrl('login');
      localStorage.removeItem('token');
      return false;
    }

    this.user.id = decode['Id'];
    this.user.fullName = decode['Name'];
    this.user.email = decode['Email'];
    this.user.userName = decode['UserName'];
    this.user.role =
      decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    return true;
  }

  getUserRole(): string {
    return this.user.role;
  }

  isPermitted(url: string): boolean {
    var menu = this.menus.find((x) => x.url === url);
    if (menu?.roles.length === 0 || menu?.roles.includes(this.user.role)) {
      return true;
    }

    return false;
  }
}

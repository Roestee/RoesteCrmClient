import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MenuPipe } from '../../../pipes/menu.pipe';
import { Menus } from '../../../menu';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MenuPipe,
    MatSidenavModule,
  ],
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css',
})
export class MainSidebarComponent implements OnInit {
  search: string = '';
  menus = Menus;
  opened: boolean = true;
  events: string[] = [];

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.menus = this.menus.filter(
      (x) => x.roles.includes(this.auth.getUserRole()) || x.roles.length === 0
    );
  }
}

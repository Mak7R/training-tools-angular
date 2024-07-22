import {Component, Inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {UserModel} from "./models/user.model";
import {NgIf} from "@angular/common";
import {IAuthService} from "./interfaces/auth.service.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(@Inject("authService") protected readonly authService: IAuthService) {

  }
}

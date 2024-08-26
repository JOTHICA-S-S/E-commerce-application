import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  constructor(public authService:AuthService){};

}

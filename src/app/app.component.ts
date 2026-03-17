import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../shared/components/side-menu/side-menu.component';
import { TopBarComponent } from '../shared/components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SideMenuComponent,TopBarComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MaNotesWeb';
}

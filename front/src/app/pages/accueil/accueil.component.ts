import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { Item } from '../../Interface/item.interface';
@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule, TableComponent],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('on init');
    this.http.get('http://localhost:3000/api/weapon').subscribe({
      next: (items: any) => {
        this.weaponList = items.payload;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  // data = [
  //   {
  //     id: 1,
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //   },
  //   {
  //     id: 2,
  //     description:
  //       'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   },
  //   {
  //     id: 3,
  //     description:
  //       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //   },
  //   {
  //     id: 4,
  //     description:
  //       'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  //   },
  //   {
  //     id: 5,
  //     description:
  //       'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //   },
  // ];
  weaponList: Array<Item> = [];
}

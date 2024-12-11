import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { Item } from '../../Interface/item.interface';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule, TableComponent],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllWeapons().subscribe({
      next: (data) => {
        this.weaponList = data;
      },
    });
  }

  weaponList: Array<Item> = [];
}

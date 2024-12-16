import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { Item, Weapon } from '../../interfaces/item.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule, TableComponent],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  weaponList: Weapon[] = [];
  loading = true;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllWeapons().subscribe({
      next: (data: Weapon[]) => {
        this.weaponList = data;
		this.loading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

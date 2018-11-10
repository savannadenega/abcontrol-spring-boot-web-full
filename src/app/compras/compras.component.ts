import { Component, OnInit } from '@angular/core';
import { MatInput, MatSelect, MatDatepicker} from '@angular/material';
import { ComprasService } from '../compras.service';
import { Compra } from '../compra';
import { faPlus, faEdit, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { UtilsService } from '../utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  faPlus = faPlus; faEdit = faEdit; faTrash = faTrash;  
  faSave = faSave; faTimesCircle = faTimesCircle;

  editingCompra : Compra;
  editingIndex : number;
  editing : boolean = false;
  adding: boolean = false;
  compras : Compra[];
  today : Date = new Date();

  constructor(private comprasService : ComprasService,
    private utils : UtilsService,
    private router: Router) { }

  ngOnInit() {
    this.getCompras();
  }

  getCompras() {
    this.comprasService.getCompras(20, 1).subscribe(
      compras => {
        this.compras = compras;
      }
    );
  }

  openDetails(i : number) {

  }
  
  initAdd() {
    this.router.navigateByUrl('/compras/new');
  }

  resetAdd() {
    this.adding = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { MatInput, MatSelect, MatDatepicker} from '@angular/material';
import { ObrasService } from '../obras.service';
import { Obra, statusObras, tipoObras } from '../obra';
import { faPlus, faEdit, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { UtilsService } from '../utils.service';


@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit {

  faPlus = faPlus; faEdit = faEdit; faTrash = faTrash;  
  faSave = faSave; faTimesCircle = faTimesCircle;

  statusObras = statusObras;
  tipoObras = tipoObras;

  editingObra : Obra;
  editingIndex : number;
  editing : boolean = false;
  adding: boolean = false;
  obras : Obra[];
  today : Date = new Date();

  constructor(private obrasService : ObrasService,
    private utils : UtilsService) { }

  ngOnInit() {
    this.getObras();
    this.resetUpdate();
  }

  resetUpdate() {
    this.editingObra = { idObra: 0, nome: '', tipoObra: '', statusObra: '', dataInicial: undefined, previsaoTermino: undefined };
    this.editing = false;
    this.editingIndex = -1;
  }

  getObras() {
    this.obrasService.getObras(20, 1).subscribe(
      obras => {
        this.obras = obras;
      }
    );
  }

  startUpdate(i : number) {
    this.editingObra = this.utils.deepCopy(this.obras[i]); 
    this.editingIndex = i;
    this.editing = true;
  }

  update() {
    this.obrasService.update(this.editingObra)
      .subscribe(
        status => {
          this.obras[this.editingIndex] = this.editingObra;
          this.resetUpdate();
        }
      );
  }

  delete(i: number) {
    this.obrasService.delete(this.obras[i]).subscribe(
      status => {
        this.obras.splice(i, 1);
      }
    );
  }

  initAdd() {
    this.resetUpdate();
    this.adding = true;
  }

  resetAdd() {
    this.resetUpdate();
    this.adding = false;
  }

  save() {
    this.obrasService.save(this.editingObra).subscribe(
      m => {
        this.obras.push(<Obra> m);
        this.resetAdd();
      }
    );
  }

}

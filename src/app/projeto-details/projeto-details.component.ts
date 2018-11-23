import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatInput, MatSelect, MatDatepicker, MatAutocomplete, MatSelectChange} from '@angular/material';
import { ProjetoService } from '../projeto.service';
import { MaterialService } from '../material.service';

import { faPlus, faEdit, faTrash, faSave, faTimesCircle, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UtilsService } from '../utils.service';
import { Material } from '../material';
import { MessageService } from '../message.service';
import { ESTADOS_PROJETO, TIPOS_PROJETO, Projeto } from '../projeto';
import { Obra } from '../obra';
import { ActivatedRoute, Router } from '@angular/router';
import { ObrasService } from '../obras.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-projeto-details',
  templateUrl: './projeto-details.component.html',
  styleUrls: ['./projeto-details.component.css']
})
export class ProjetoDetailsComponent implements OnInit {

  faTrash = faTrash; faSave = faSave; faTimesCircle = faTimesCircle;

  id: number;
  novoProjeto : boolean = false;
  static NEW_PROJETO_ID : number = -1;
  novaObra : string;
  projeto: Projeto;
  tiposProjeto : string[] = TIPOS_PROJETO;
  estadosProjeto : string[] = ESTADOS_PROJETO;
  today : Date = new Date();
 
  obras : Obra[];
  
  IN_PROGRESS : boolean = false;

  constructor(private projetoService : ProjetoService, 
    private obraService: ObrasService,
    private messageService: MessageService,
    private utils : UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    
    const id_s = this.route.snapshot.paramMap.get('id');
    if (id_s != 'new') {
      const id = +id_s;
      this.getProjeto(id);
    } else {
      this.novoProjeto = true;
      this.projeto = new Projeto('', '', '', this.today, this.today);
      this.getObras();
    }
  }

  getObras() {
    this.obraService.getObras(20, 1).subscribe(
      obras => {
        let projetoObrasIDs = this.projeto.obras.map(obra => obra.id);
        this.obras = obras.filter(obra => !projetoObrasIDs.includes(obra.id));
        console.log(this.obras);
        console.log(this.projeto);
      }
    );
  }

  getProjeto(id : number) {
    this.projetoService.getProjeto(id).subscribe(
      projeto => {
        this.projeto = projeto;
        this.getObras();
      }
    );
  }
  
  back() {
    this.location.back();
  }

  remove(i : number) {
    this.obras.push(this.projeto.obras[i]);
    this.projeto.obras.splice(i, 1);
  }

  novaObraChanged(event: MatSelectChange) {
    let id = event.value;
    console.log(id);
    for (let i = 0; i < this.obras.length; i++) {
      if (this.obras[i].id == id) {
        this.projeto.obras.push(this.obras[i]);
        this.obras.splice(i, 1);
      }
    }
    this.novaObra = '';
  }

  save(){
    if (this.IN_PROGRESS) return;
    this.IN_PROGRESS = true;
    if (this.novoProjeto) {
      this.projetoService.save(this.projeto).subscribe(
        result => {
          this.IN_PROGRESS = false;
          console.log(result);
          this.router.navigateByUrl('/projetos');
        }
      )
    } else {
      this.projetoService.update(this.projeto).subscribe(
        result => {
          this.IN_PROGRESS = false;
          this.router.navigateByUrl('/projetos');
        }
      );
    }
  }

}

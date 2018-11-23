import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../projeto.service';
import { Projeto } from '../projeto';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { UtilsService } from '../utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  faPlus = faPlus;
  projetos : Projeto[];

  constructor(private projetoService : ProjetoService,
    private utils : UtilsService,
    private router: Router) { }

  ngOnInit() {
    this.getProjetos();
  }

  getProjetos() {
    this.projetoService.getProjetos(20, 1).subscribe(
      projetos => {
        this.projetos = projetos;
      }
    );
  }

  initAdd() {
    this.router.navigateByUrl('/projetos/new');
  }

}

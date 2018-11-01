import { Component, OnInit } from '@angular/core';
import { FormasPagamentoService } from '../formas-pagamento.service';
import { FormaPagamento } from '../forma-pagamento';
import { faPlus, faEdit, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-formas-pagamento',
  templateUrl: './formas-pagamento.component.html',
  styleUrls: ['./formas-pagamento.component.css']
})
export class FormasPagamentoComponent implements OnInit {

  faPlus = faPlus; faEdit = faEdit; faTrash = faTrash;  
  faSave = faSave; faTimesCircle = faTimesCircle;

  editingForma : FormaPagamento;
  editingIndex : number;
  editing : boolean = false;
  adding: boolean = false;
  formas : FormaPagamento[];

  constructor(private formaService : FormasPagamentoService,
              private utils : UtilsService) { }

  ngOnInit() {
    this.getFormasPagamento();
    this.resetUpdate();
  }

  resetUpdate() {
    this.editingForma = { id: 0, formaPagamento : '', descricaoPagamento : '', valorPagamento : 0};
    this.editing = false;
    this.editingIndex = -1;
  }

  getFormasPagamento() {
    this.formaService.getFormasPagamento(20, 1).subscribe(
      formas => {
        this.formas = formas;
      }
    );
  }

  startUpdate(i : number) {
    this.editingForma = this.utils.deepCopy(this.formas[i]); 
    this.editingIndex = i;
    this.editing = true;
  }

  updateFormaPagamento() {
    this.formaService.updateFormaPagamento(this.editingForma)
      .subscribe(
        status => {
          this.formas[this.editingIndex] = this.editingForma;
          this.resetUpdate();
        }
      );
  }

  deleteFormaPagamento(i: number) {
    this.formaService.deleteFormaPagamento(this.formas[i]).subscribe(
      status => {
        this.formas.splice(i, 1);
      }
    );
  }

  initAddFormaPagamento() {
    this.resetUpdate();
    this.adding = true;
  }

  resetAdd() {
    this.resetUpdate();
    this.adding = false;
  }

  saveFormaPagamento() {
    this.formaService.saveFormaPagamento(this.editingForma).subscribe(
      m => {
        this.formas.push(<FormaPagamento> m);
        this.resetAdd();
      }
    );
  }

}

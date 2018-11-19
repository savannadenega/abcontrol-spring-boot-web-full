import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatInput, MatSelect, MatDatepicker, MatAutocomplete} from '@angular/material';
import { ComprasService } from '../compras.service';
import { MaterialService } from '../material.service';
import { Compra, OrdemCompra, ESTADOS_COMPRA } from '../compra';
import { faPlus, faEdit, faTrash, faSave, faTimesCircle, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UtilsService } from '../utils.service';
import { Material } from '../material';
import { MessageService } from '../message.service';


import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-compra-details',
  templateUrl: './compra-details.component.html',
  styleUrls: ['./compra-details.component.css']
})
export class CompraDetailsComponent implements OnInit {

  faPlus = faPlus; faEdit = faEdit; faTrash = faTrash;  
  faSave = faSave; faTimesCircle = faTimesCircle;
  faShareSquare = faShareSquare;

  id: number;
  newCompra : boolean = false;
  static NEW_COMPRA_ID : number = -1;
  editing : boolean = false;
  adding: boolean = false;
  editingIndex: number = -1;
  editingItem: OrdemCompra;
  descricaoMaterial : string;
  compra: Compra;
  estadosCompra : string[] = ESTADOS_COMPRA;
  today : Date = new Date();
  materials : Material[];
  filteredMaterials: Observable<string[]>;
  addingMaterialControl = new FormControl('', [Validators.required]);
  editingMaterialControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  materialInvalido : boolean = false;
  IN_PROGRESS : boolean = false;

  constructor(private comprasService : ComprasService, 
    private materialService : MaterialService,
    private messageService: MessageService,
    private utils : UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {   
      this.getMaterials();
      const id_s = this.route.snapshot.paramMap.get('id');
      if (id_s != 'new') {
        const id = +id_s;
        this.getCompra(id);
      } else {
        this.newCompra = true;
        this.compra = new Compra(CompraDetailsComponent.NEW_COMPRA_ID, '', new Date(), '', '', 'PENDENTE');
      }
      
      
  }

  getCompra(id: number) {
    this.comprasService.getCompra(id).subscribe(
      compra => {
        this.compra = compra;
      }
    );
  }

  getMaterials() {
    this.materialService.getMaterials(-1, 1).subscribe(
      materials => {
        this.materials = materials;
      });
  }

  private _filter(value: string): string[] {
    return this.materials
        .filter(function(material) { return material.descricaoMaterial.toLowerCase().includes(value.toLowerCase());})
        .map(function (material) { return material.descricaoMaterial;});
  }

  back() {
    this.location.back();
  }

  delete(i: number) {
    this.compra.ordemMaterial.splice(i, 1);
  }

  startUpdate(i: number) {
    this.filteredMaterials = this.editingMaterialControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.editingIndex = i;
    this.editing = true;
    this.editingItem = OrdemCompra.clone(this.compra.ordemMaterial[i]);
    this.descricaoMaterial = this.editingItem.material.descricaoMaterial;
    console.log(this.editingItem);
  }

  resetUpdate() {
    this.descricaoMaterial = '';
    this.editing = false;
    this.editingIndex = -1;
    this.editingItem = undefined;
  }

  update() {
    let found = this.findMaterialFromDescription();
    if (found) {
      this.compra.ordemMaterial[this.editingIndex] = this.editingItem;
      this.resetUpdate();
    } else {
      this.notifyMaterialIncorreto();
    }
  }

  findMaterialFromDescription() {
    for (let m of this.materials) {
      if (this.descricaoMaterial == m.descricaoMaterial) {
        this.editingItem.material = m;
        return true;
      }
    }
    return false;
  }

  notifyMaterialIncorreto() {
    this.messageService.add("Material Incorreto", "Por favor, selecione um material da lista.");
    this.materialInvalido = true;
  }


  getEmailErrorMessage() {
    return this.emailControl.hasError('required') ? 'Campo mandatório.' :
        this.emailControl.hasError('email') ? 'E-mail inválido' : '';
  }     
  
  getRequiredErrorMessage(formControl : FormControl) {
    return formControl.hasError('required') ? 'Campo mandatório.' : '';
  }

  getMaterialErrorMessage(formControl : FormControl) {
    return this.materialInvalido ? 'Material Inválido' :
        this.getRequiredErrorMessage(formControl);
  }

  initAdd() {
    this.filteredMaterials = this.addingMaterialControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.editingItem = new OrdemCompra(1, undefined);
    this.descricaoMaterial = '';
    this.adding = true;
  }  

  add() {
    let found = this.findMaterialFromDescription();
    if (found) {
      this.compra.ordemMaterial.push(this.editingItem);
      this.resetAdd();
    } else {
      this.notifyMaterialIncorreto();
    }
  }

  resetAdd() {
    this.editingItem = undefined;
    this.adding = false;
    this.descricaoMaterial = '';
  }

  save(){
    if (this.IN_PROGRESS) return;
    this.IN_PROGRESS = true;
    console.log(this.compra);
    if (this.compra.id == CompraDetailsComponent.NEW_COMPRA_ID) {
      this.comprasService.save(this.compra).subscribe(
        result => {
          this.IN_PROGRESS = false;
          console.log(result);
          this.router.navigateByUrl('/compras');
        }
      )
    } else {
      this.comprasService.update(this.compra).subscribe(
        result => {
          this.IN_PROGRESS = false;
          this.router.navigateByUrl('/compras');
        }
      );
    }
    
  }

  finalizar() {
    if (this.IN_PROGRESS) return;
    this.IN_PROGRESS = true;
    this.compra.estadoCompra = "ENVIADO";
    if (this.compra.id == CompraDetailsComponent.NEW_COMPRA_ID) {
      this.comprasService.save(this.compra).subscribe(
        result => {
          this.IN_PROGRESS = false;
          this.compra = result;
          this.enviarEmail();
          this.router.navigateByUrl('/compras');
        }
      );
    } else {
      this.comprasService.update(this.compra).subscribe(
        result => {
          this.IN_PROGRESS = false;
          this.enviarEmail();
          this.router.navigateByUrl('/compras');
        }
      );
    }
  }

  enviarEmail() {
    this.comprasService.sendEmail(this.compra).subscribe(
      result => {
        console.log(result);
        this.router.navigateByUrl('/compras');
      }
    )
  }



}
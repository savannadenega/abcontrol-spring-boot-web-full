import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../material.service';
import {Material} from '../material';
import { faPlus, faEdit, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  faPlus = faPlus; faEdit = faEdit; faTrash = faTrash;  
  faSave = faSave; faTimesCircle = faTimesCircle;

  editingMaterial : Material;
  editingIndex : number;
  editing : boolean = false;
  adding: boolean = false;
  materials : Material[];
  constructor(private materialService : MaterialService,
              private utils : UtilsService) { }

  ngOnInit() {
    this.getMaterials();
    this.resetUpdate();
  }

  resetUpdate() {
    this.editingMaterial = { id: 0, tipoMaterial : '', descricaoMaterial : '', tipoUnidade : '', valorUnidade : 0};
    this.editing = false;
    this.editingIndex = -1;
  }

  getMaterials() {
    this.materialService.getMaterials(20, 1).subscribe(
      materials => {
        this.materials = materials;
        console.log(this.materials);
      }
    );
  }

  startUpdate(i : number) {
  //  this.editingMaterial = Object.create(this.materials[i]);
    this.editingMaterial = this.utils.deepCopy(this.materials[i]); 
    console.log(this.editingMaterial);
    this.editingIndex = i;
    this.editing = true;
  }

  updateMaterial() {
    console.log(this.editingMaterial);
    this.materialService.updateMaterial(this.editingMaterial)
      .subscribe(
        status => {
          this.materials[this.editingIndex] = this.editingMaterial;
          this.resetUpdate();
        }
      );
  }

  deleteMaterial(i: number) {
    this.materialService.deleteMaterial(this.materials[i]).subscribe(
      status => {
        this.materials.splice(i, 1);
      }
    );
  }

  initAddMaterial() {
    this.resetUpdate();
    this.adding = true;
  }

  resetAdd() {
    this.resetUpdate();
    this.adding = false;
  }

  saveMaterial() {
    this.materialService.saveMaterial(this.editingMaterial).subscribe(
      m => {
        this.materials.push(<Material> m);
        this.resetAdd();
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../material.service';
import {Material} from '../material';
import { faPlus, faEdit, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
  constructor(private materialService : MaterialService) { }

  ngOnInit() {
    this.getMaterials();
    this.resetUpdate();
  }

  resetUpdate() {
    this.editingMaterial = { id: '-', tipoMaterial : '', descricao : '', tipoUnidade : '', valorUnidade : 0};
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
    this.editingMaterial = this.deepCopy(this.materials[i]); 
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

  deepCopy(obj) {
      var copy;

      // Handle the 3 simple types, and null or undefined
      if (null == obj || "object" != typeof obj) return obj;

      // Handle Date
      if (obj instanceof Date) {
          copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
      }

      // Handle Array
      if (obj instanceof Array) {
          copy = [];
          for (var i = 0, len = obj.length; i < len; i++) {
              copy[i] = this.deepCopy(obj[i]);
          }
          return copy;
      }

      // Handle Object
      if (obj instanceof Object) {
          copy = {};
          for (var attr in obj) {
              if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
          }
          return copy;
      }

      throw new Error("Unable to copy obj! Its type isn't supported.");
  }
}

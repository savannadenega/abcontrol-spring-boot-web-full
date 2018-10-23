import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../material.service';
import {Material} from '../material';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

  materials : Material[];
  constructor(private materialService : MaterialService) { }

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.materialService.getMaterials(20, 1).subscribe(
      materials => {
        this.materials = materials;
        console.log(this.materials);
      }
    );
  }


}

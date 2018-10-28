import { Component, OnInit, Input } from '@angular/core';
import { Material } from '../../material';

@Component({
  selector: 'app-material-row',
  templateUrl: './material-row.component.html',
  styleUrls: ['./material-row.component.css']
})
export class MaterialRowComponent implements OnInit {
  @Input() material: Material;
  
  constructor() { }

  ngOnInit() {
  }

}

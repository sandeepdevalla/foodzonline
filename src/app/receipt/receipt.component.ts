import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  details;
  constructor(public router: Router ) { }

  ngOnInit() {
    this.details = JSON.parse(localStorage.getItem('details'));
  }
  btnClick() {
    this.router.navigate(['/home']);
  }

}

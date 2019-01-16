import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  selectedItems;
  details;
  totalCount;
  totalAmount;

  constructor(public router: Router) { }

  ngOnInit() {
    this.selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
    if ( this.selectedItems ) {
      this.getTotalValues();
    }
    this.details = {
      firstName : new FormControl(''),
      lastName : new FormControl(''),
      add1 : new FormControl(''),
      add2 : new FormControl(''),
      city : new FormControl(''),
      state : new FormControl(''),
      pin : new FormControl(''),
      phone : new FormControl('')
    };
  }
  increaceItem(item, index) {
    this.selectedItems[index].count ++;
    this.selectedItems[index].totalAmount = this.selectedItems[index].count * this.selectedItems[index].price;
    this.getTotalValues();

  }
  decreaseItem(item, index) {

    if ( item.count === 1) {
      this.selectedItems.splice(index, 1);
    this.getTotalValues();
      return true;
    }
    this.selectedItems[index].count --;
    this.selectedItems[index].totalAmount = this.selectedItems[index].count * this.selectedItems[index].price;
    this.getTotalValues();

  }
  getTotalValues() {
    const totalAmount = this.selectedItems.map((item) => {
      return item.totalAmount;
    });
    this.totalAmount = totalAmount.reduce((total, amount) => {
      return total + amount;
    });
    const totalCount = this.selectedItems.map((item) => {
      return item.count;
    });
    this.totalCount = totalCount.reduce((total, count) => {
      return total + count;
    });
  }
  btnClick() {
    const details = {
      firstName : this.details.firstName.value,
      lastName : this.details.lastName.value,
      add1 : this.details.add1.value,
      add2 : this.details.add2.value,
      city : this.details.city.value,
      state : this.details.state.value,
      pin : this.details.pin.value,
      phone : this.details.phone.value
    };
    localStorage.setItem('details', JSON.stringify(details));
    this.router.navigate(['/receipt']);
  }
}

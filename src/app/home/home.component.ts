import { Component, OnInit } from '@angular/core';
import * as items from '../../../foodItems';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 items;
 southItems;
 northItems;
 totalCount;
 totalAmount;
 selectedItems = [];
  constructor(public router: Router) {
   }

  ngOnInit() {
    this.getDetails();
  }
  btnClick() {
    localStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
    this.router.navigate(['/order']);
  }
  addItem(item) {
    this.selectedItems.map(selItem => {
      if (selItem.name === item.name ) {
        selItem.totalAmount = (selItem.count + 1) * selItem.price;
        return selItem.count++;
      }
    });
    this.addNewItems(item);
    this.getTotalValues();
  }
  addNewItems(item) {
    const selectedItems = this.selectedItems.filter(selItem => {
       return selItem.name === item.name;
       });
    if (selectedItems.length === 0) {
      const selectedItem = {...item};
      selectedItem.count = 1;
      selectedItem.totalAmount = selectedItem.count * selectedItem.price;
      this.selectedItems.push(selectedItem);
    }
  }
  removeItem(item) {
    let index = 0;
    const selectedItems = this.selectedItems.filter((selItem, i) => {
      if (selItem.name === item.name) {
        index = i;
        return true;
      }
      });
      if (selectedItems.length > 0) {
        if (this.checkForZeroCount(selectedItems, index)) {
            this.getTotalValues();
          return true;
        }
        const selectedItem = {...item};
        selectedItem.count = selectedItems[0].count - 1;
        selectedItem.totalAmount = selectedItem.count * selectedItem.price;
        this.selectedItems[index] = selectedItem;
      }
      this.getTotalValues();
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
  checkForZeroCount(selectedItems , index) {
    if ( selectedItems[0].count === 1) {
      this.selectedItems.splice(index, 1);
      return true;
    }
    return false;
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
  getDetails() {
    this.items = items.default.items;
    this.southItems = this.items.filter(item => {
      return item.type === 'south';
    });
    this.northItems = this.items.filter(item => {
      return item.type === 'north';
    });
  }

}

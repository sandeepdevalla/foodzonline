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
  addItem(item){
    const selectedItems = this.selectedItems.filter(selItem => {
      return selItem.name === item.name;
    });
    this.checkForSelectedItem(selectedItems,item);
    this.getTotalValues();
  }
  checkForSelectedItem(selectedItems,item){
    selectedItems.length === 0 ? this.newItem(item) : this.existingItem(item)
  }
  newItem(item){
    const selectedItem = {...item};
    selectedItem.count = 1;
    selectedItem.totalAmount = selectedItem.count * selectedItem.price;
    this.selectedItems.push(selectedItem);
  }
  existingItem(item){
    this.selectedItems.map(selItem => {
          if (selItem.name === item.name ) {
            selItem.totalAmount = (selItem.count + 1) * selItem.price;
            return selItem.count++;
          }
        });
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
    this.totalAmount =0;
    this.totalCount =0;
    this.selectedItems.map((item) => {
      this.totalAmount += item.totalAmount;
      this.totalCount  += item.count;
    });
  }
  getDetails() {
    this.southItems = items.default.southItems;
    this.northItems = items.default.northItems;
  }
}
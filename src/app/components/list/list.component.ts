import { Component, OnInit } from '@angular/core';
import { ListServiceService } from './list-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // count;
  noEvents: boolean;
  eventsList;
  copyEventListArray = []
  localJson = [
    {
      "name": "Event 1",
      "image": "assets/images/events.jpg",
      "date_of_event": "02/08/2019",
      "available_seats": "5"
    },
    {
      "name": "Event 2",
      "image": "assets/images/events.jpg",
      "date_of_event": "02/08/2019",
      "available_seats": "5"
    },
    {
      "name": "Event 3",
      "image": "assets/images/events.jpg",

      "date_of_event": "02/08/2019",
      "available_seats": "5"
    },
    {
      "name": "Event 4",
      "image": "assets/images/events.jpg",

      "date_of_event": "02/08/2019",
      "available_seats": "5"
    },
    {
      "name": "Event 5",
      "image": "assets/images/events.jpg",

      "date_of_event": "02/08/2019",
      "available_seats": "0"
    },
    {
      "name": "Event 6",
      "image": "assets/images/events.jpg",

      "date_of_event": "02/08/2019",
      "available_seats": "5"
    },
    {
      "name": "Event 7",
      "image": "assets/images/events.jpg",

      "date_of_event": "02/08/2019",
      "available_seats": "5"
    }

  ]
  constructor(private listService: ListServiceService, private router: Router) { }

  ngOnInit() {
    this.eventsList = this.localJson;
  }
  onSearch(searchValue) {
    this.eventsList = [];
    this.localJson.forEach((elem) => {
      if (elem.name.toLowerCase().search(searchValue.toLowerCase())) {
        this.eventsList.push(elem);
      }
    })
  }
  searchCategoryOnChange(searchCategory) {
    console.log(searchCategory, 'searchCategory');

    let index;
    // if (this.count == 0)
    // this.copyEventListArray = [...this.eventsList];
    // this.count++;
    if (searchCategory) {
      console.log('in if >>>>>>>>>>>>>>');

      this.eventsList = [];
      this.localJson.forEach((item) => {
        console.log(item, 'item >>>>>');

        index = (item['name'].toLowerCase()).search(searchCategory.toLowerCase());
        if (index == -1) {
          //  this.noCategories = true;
        } else {
          //this.noCategories = false;
          this.eventsList.push(item);
        }
      })
    } else if (!searchCategory) {
      // this.noCategories = false;
      this.eventsList = [];
      this.eventsList = this.localJson;
    }
    // this.loopData = this.categoryList;
    if (this.eventsList.length) {
      this.noEvents = false;
    }
    else {
      this.noEvents = true;
    }
    // console.log("this.productList", this.noCategories,this.categoryList)
    // this.loader.hidePreloader();

  }

  goToBookings(event) {
    localStorage.setItem('currentEvent', JSON.stringify(event));
    // this.listService.sendMessage(event);
    this.router.navigate(['booking']);

  }
}

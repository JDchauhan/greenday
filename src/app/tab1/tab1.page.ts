import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map, delay } from 'rxjs/operators';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // constructor() {}
  data: any;

  constructor(public http: Http) {
    this.data = [{
      author_img: "/assets/icon/user.jpg",
      author: "Jane",
      flapper: "FireBird",
      time: "Monday, 7:27 PM",
      count: "1",
      title: "One Cup Per Child",
      subtitle: "FireBird",
      image: "/assets/icon/user.jpg",
      body: "Loreum epsium dollor, Loreum epsium dollor, Loreum epsium dollor, Loreum epsium dollor, Loreum epsium dollor"
    }, {
      author_img: "/assets/icon/user.jpg",
      author: "Jane",
      flapper: "FireBird",
      time: "Monday, 7:27 PM",
      count: "1",
      title: "One Cup Per Child",
      subtitle: "FireBird",
      image: "/assets/icon/user.jpg",
      body: "Loreum epsium dollor, Loreum epsium dollor, Loreum epsium dollor, Loreum epsium dollor, Loreum epsium dollor"
    }]
    // setInterval(()=>{
    //   this.storyUpdater()
    // },3000)
  }

  async storyUpdater() {
      let res = await this.load()
      console.log(res)
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').pipe(map(data => data)).subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }
}


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

    // this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
    //     this.posts = data.data.children;
    // });

    setInterval(()=>{
      this.storyUpdater()
    },3000)
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


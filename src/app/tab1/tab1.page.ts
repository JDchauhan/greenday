import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map, delay, count } from 'rxjs/operators';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any;
  stories: any;
  
  constructor(public http: Http) {
    this.stories = []
    // setInterval(()=>{
    //   this.storyUpdater()
    // },3000)
  }

  async storyUpdater() {
      let res = await this.load()
      this.data = {
        author_img: "/assets/icon/user.jpg",
        author: "Jane",
        flapper: "FireBird",
        time: "Monday, 7:27 PM",
        count: 1,
        title: "One Cup Per Child",
        subtitle: "FireBird",
        image: "/assets/icon/user.jpg",
        body: "Loreum epsium dollor, Loreum epsium dollor, Loreum epsium dollor, Loreum epsium dollor, Loreum epsium dollor"
      }
      this.data.count += this.stories.length
      this.stories.unshift(this.data)
  }

  load() {
    return new Promise(resolve => {
      this.http.get('http://127.0.0.1:3000/feeds').pipe(map(data => data)).subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }

  async doRefresh(event) {
    await this.storyUpdater()

    event.target.complete();
    
  }
}


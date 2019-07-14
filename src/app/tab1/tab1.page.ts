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
  res: any;

  constructor(public http: Http) {
    this.stories = []
    // setInterval(()=>{
    //   this.storyUpdater()
    // },3000)
  }

  async storyUpdater() {
      this.res = await this.load()
      this.res.data.forEach(story => {
        this.stories.unshift(story)  
      });
  }

  load() {
    return new Promise(resolve => {
      this.http.get('http://127.0.0.1:3000/feeds').pipe(map(data => data)).subscribe(data => {
        this.data = data;
        resolve(JSON.parse(this.data._body));
      });
    });
  }

  async doRefresh(event) {
    await this.storyUpdater()

    event.target.complete();
    
  }
}


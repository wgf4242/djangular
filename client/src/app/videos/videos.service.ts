import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


// const endpoint = '/static/ang/assets/json/videos.json' // http://www.yourdomain.com/api/videos/
const endpoint = '/api/videos/'

@Injectable()
export class VideoService {
  constructor(private http: Http) { 
  }

  list(){
      return this.http.get(endpoint)
              .map(response=>response.json())
              .catch(this.handleError)
  }
  
  featured(){
      return this.http.get(endpoint + "featured/")
              .map(response=>response.json())
              .catch(this.handleError)
  }

  get(slug){
    console.log(endpoint + slug + "/");
    return this.http.get(endpoint + slug + "/")
            .map(response=>response.json())
            .catch(this.handleError);
    
  //     return this.http.get(endpoint)
  //             .map(response=>{
  //                    let data = response.json().filter(item=>{
  //                                     if (item.slug == slug) {
  //                                         return item
  //                                     }
  //                                 })
  //                    if (data.length == 1){
  //                        return data[0]
  //                    }
  //                    return {}
  //              })
  //             .catch(this.handleError)
  }

  search(query){
    let queryString = `?q=${query}`
        return this.http.get(endpoint + queryString)
                .map(response=>response.json())
                .catch(this.handleError)
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || '' }`;
    } else {
      // errMsg = error.message ? error.message : error.toString();
      errMsg = "Server error occurred please try again.";
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }



  // private handleError(error:any, caught:any): any{
  //     if (error.status == 404) {
  //       alert("Oopps. Not found")
  //     } else {
  //       alert("Something went wrong, Please try again.")
  //     }
  // }

}

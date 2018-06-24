import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent  {
	valuesObservable : Observable<any[]>;
	//item : Array<Object>;
	public item:any;
	 tempList = new Array();
	 timeList = new Array();
	 seriesList = new Array();
    chart = new Chart();
	
		constructor(public db: AngularFireDatabase){
			
			this.valuesObservable = this.db.list('/datapoints').valueChanges();

		}
	
	 	getValues(){
   		return this.valuesObservable;
   	}
   	
   	
   	
   	ngOnInit(){
          this.getValues().subscribe(item => {this.item = item;
          //console.log(this.item);
         
        for(var i=0;i<this.item.length;i++){
        	//console.log(this.item[i]);
         	//this.tempList.push(this.item[i].temperature);
         	this.timeList.push(this.item[i].time);
         	this.seriesList.push([this.item[i].time,this.item[i].temperature]);
        }
         //console.log(this.tempList);
         //console.log(this.seriesList);
        
          this.chart = new Chart({
		chart : {
			
			type : 'line'
		},
		title : {
			text : 'Temperature vs Time'
		},
		credits : {
			enabled : false
		},
		xAxis: {
			categories: this.timeList
		},
		series : [{
			data : this.seriesList
			}]
          });
	
		});
          }
      
   	}
   	
   	
   	
	
   		
   
	
	
	


   


import { Component, OnInit , OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as d3_projection from 'd3-geo-projection';
import * as topojson from 'topojson';
import {JsonService} from '../json.service';

@Component({
	selector: 'app-map',
	providers: [JsonService],
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
	encapsulation: ViewEncapsulation.None
	})
export class MapComponent implements OnInit, OnChanges {
	@Input() private mapdata: Array<any>;
	private margin: any;
	private svg: any;
	private width: number;
	private height: number;
	private projection: any;
	private path: any;
	private world: any;
	private tooltipOffset: any;
	private tooltip: any;
	public active: any;
	private features: any;
	private featureCollection: any;
	private zoom: any;
	private view:any;

	constructor(private jsonservice: JsonService) {
		this.margin = { top: 20, bottom: 20, left: 20, right: 20};
		this.svg;
		this.width = window.innerWidth;
		this.height = window.innerHeight  * .9165;
		this.projection;
		this.path;
		this.tooltipOffset = {x: 15 , y: -35};
		this.tooltip;
		this.active = d3.select(null)
		this.features;
		this.featureCollection;
		this.zoom;
		this.view;


		this.jsonservice.getData('assets/topojson/countries.json')
			.subscribe(data => this.setMap(data) , err => console.log(err));
	}

	ngOnInit() {

	}


	setMap(data:Object){
		this.world = data;

		this.featureCollection = topojson.feature(this.world , this.world.objects.collection);

		this.projection = d3_projection.geoRobinson()
			.rotate([-10, 0, 0])
			.fitSize([this.width, this.height], this.featureCollection);

		this.path = d3.geoPath()
			.projection(this.projection);

		this.tooltip = d3.select('app-map').append('div')
				.attr('class' , 'tooltip')
				.style('opacity', 0);

		this.zoom = d3.zoom()
			.scaleExtent([1, 8])
			.on("zoom", () => {
				this.features.style("stroke-width", 1.5 / d3.event.transform.k + "px");
				this.features.attr("transform", d3.event.transform);
			});

		this.svg = d3.select('app-map').append('svg')
			.attr('width', '100%')
			.attr('height', this.height)
			.call(this.zoom);

		this.view = this.svg.append('rect')
    		.attr("class", "background")
			.on("click", () => {
				this.reset()}
			);

		this.features = this.svg.append('g')

		this.features.selectAll('path')
			.data(this.featureCollection.features)
			.enter()
			.append('path')
			.attr( 'd', this.path )
			.on('mouseover' , (d) => {
				this.showToolTip(d);
				})
			.on('mousemove' , () => {
				this.tooltip.style('top' , (d3.event.pageY+this.tooltipOffset.y)+'px')
					.style('left' , (d3.event.pageX+this.tooltipOffset.x)+'px');
				})
			.on('mouseout' , () => {
				this.hideToolTip();
				})
			.on('click' , (d) => {
				this.clicked(d);
			});

	}

	showToolTip(d){
		this.tooltip.style('opacity' , .90)
			.html(d.properties.NAME);
	}

	moveToolTip(){

	}

	hideToolTip(){
		this.tooltip.style('opacity' , 0);
	}

	clicked(d) {
		//highlight the clicked country
		if (this.active.data()[0] === d)  return this.reset();
		this.active.classed("highlighted", false);
		this.active = d3.selectAll('path')
			.filter(function(i){return i['properties']['ISO_A2'] == d.properties.ISO_A2})
			.classed("highlighted" , true);

		//zoom to country bounding box
		var bounds = this.path.bounds(d),
			dx = bounds[1][0] - bounds[0][0],
			dy = bounds[1][1] - bounds[0][1],
			x = (bounds[0][0] + bounds[1][0]) / 2,
			y = (bounds[0][1] + bounds[1][1]) / 2,
			scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / this.width, dy / this.height))),
			translate = [this.width / 2 - scale * x, this.height / 2 - scale * y];

		this.svg.transition()
			.duration(750)
			.call( this.zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated f


	  }
	reset() {
		//remove highlighted color upon delecting
		this.active.classed("highlighted", false);
		this.active = d3.select(null);

		//reset zoom
		this.svg.transition()
      		.duration(750)
      		.call(this.zoom.transform, d3.zoomIdentity ); // updated for d3 v4
	  }

	ngAfterViewInit(){

	}

	ngOnChanges() {

	}

}

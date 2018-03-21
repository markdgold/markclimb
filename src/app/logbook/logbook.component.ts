import { Component, OnInit, ViewChild } from '@angular/core';
import { LogbookService } from './logbook.service';
import { LogListComponent } from './log-list/log-list.component';

declare var d3:any;

@Component({
  selector: 'mdg-logbook',
  templateUrl: './logbook.component.html',
  styles: [
    `
    .full-height{
      background: #fefff6;
    }
    h1 {
        color: black;
        margin-top: 0px;
        padding-top: 30px;
        text-align: center;
    }
    #bodyWrapper{
        width: 1007px;
        margin: 0 auto;
    }
    #dashboard{
        width: 504px;
        display: inline-block;
    }
    .log-list{
        border: 2px solid black;
        display: inline-block;
        height: 548px;
        width: 500px;
        float: right;
    }
    :host>>>path {  stroke: #fff; }
    :host>>>path:hover {  opacity:0.9; }
    :host>>>.histRect:hover {  fill:lightgrey; cursor:pointer }
    :host>>>.axis {  font: 10px sans-serif; }
    
    :host>>>.axis path,
    :host>>>.axis line {
      fill: none;
      stroke: #000;
      shape-rendering: crispEdges;
    }
    :host>>>.x.axis path {  display: none; }
    :host>>>.histogram{
      border: 2px solid black;
      display: block;
      margin-right: 20px;
    }
    :host>>>.legend{
      display:inline-block;
      border-collapse: collapse;
      border-spacing: 0px;
      color: black;
      width: 260px;
      height: 240px;
      font-weight: bold;
      font-size: 22px;
      border: 2px solid black;
      border-right: none;
    }
    :host>>>.legend tr{
      height: 78px;
    }
    
    :host>>>.legend td{
      padding:4px 0px;
      padding-left: 10px;
      vertical-align:middle;
      color: black;
      text-align: left;
    }
    :host>>>.tries{
        width: 140px;
    }
    :host>>>.legendcount{
        width: 80px;
    } 
    :host>>>.legendPerc{
        width: 80px
    }
    :host>>>.pieChart{
      display: inline-block;
      border: 2px solid black;
      border-left: none;
    }
    :host>>>.pieChart:hover{
        cursor: pointer;
    }
    :host>>>#clear-button{
        margin-top: 7px;
        border: 2px solid black;
        background: none;
        color: black;
        font-size: 18px;
        font-weight: bolder;
    }
    @media(max-width: 1050px){
        #bodyWrapper{
            display: none;
        }
        #topFive{
            display: inline-block;
            width: 100%;
            margin: 0 auto;
            color: black;
            text-align: center;
        }
        #topFive p{
            font-size: 16px;
            margin-top: 30px;
        }
    }
    `
  ]
})


export class LogbookComponent implements OnInit {
  
  parentFilter: any = {
      by: '',
      value: '',
  };

  @ViewChild(LogListComponent) child: LogListComponent;

  clearFilter(){
    this.parentFilter.by = '';
    this.parentFilter.value = '';
  }

  constructor(private logbookService: LogbookService) {
      
   }

  dashboard(id, fData, parentFilter){
    var barColor = '#3c3c3c';
    // compute total for each Grade.
    fData.forEach(function(d){d.total=d.count.Flash+d.count["Second Go"]+d.count.Redpoint;});

    function segColor(c){ return {Flash:"#E89C04", "Second Go":"#9F9F9F",Redpoint:"#A2592C"}[c]; }
    
    // function to handle histogram.
    function histoGram(fD){
      
        var hG:{update:any} = {update:()=>{}}; 
        var hGDim = {t: 30, r: 5, b: 30, l: 2, w:500, h:100};
        hGDim.w = 500 - hGDim.l - hGDim.r, 
        hGDim.h = 300 - hGDim.t - hGDim.b;

        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
            .attr('class', 'histogram')
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                .domain(fD.map(function(d) { return d[0]; }));

        var Vx = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                .domain(fD.map(function(d) { return "V"+d[0]; }));

        // Add x-axis to the histogram svg.
        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(d3.svg.axis().scale(Vx).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([hGDim.h, 0])
                .domain([0, d3.max(fD, function(d) { return d[1]; })]);

        // Create bars for histogram to contain rectangles and grade labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
                .append("g").attr("class", "bar");
        
        //create the rectangles.
        bars.append("rect")
            .attr('class', 'histRect')
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("width", x.rangeBand())
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr('fill',barColor)
            .on("mouseover",mouseover)// mouseover is defined beFlash.
            .on("mouseout",mouseout)// mouseout is defined beFlash.
            .on("click", click);
            
        //Create the count labels above the rectangles.
        bars.append("text").text(function(d){ return d3.format(",")(d[1])})
            .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
            .attr("y", function(d) { return y(d[1])-5; })
            .attr("text-anchor", "Seconddle");
        
        function mouseover(d){  // utility function to be called on mouseover.
            // filter for selected Grade.
            var st = fData.filter(function(s){ return s.Grade == d[0];})[0],
                nD = d3.keys(st.count).map(function(s){ return {type:s, count:st.count[s]};});
               
            // call update functions of pie-chart and legend.    
            pC.update(nD);
            leg.update(nD);
        }
        
        function mouseout(d){    // utility function to be called on mouseout.
            // reset the pie-chart and legend.    
            if(parentFilter.by === ''){ // if not filter, reset with full data
                pC.update(tF);
                leg.update(tF);
            } else { // else if filter, reset with filtered data
                var st = fData.filter(function(s){ return s.Grade == parentFilter.value;})[0],
                    nD = d3.keys(st.count).map(function(s){ return {type:s, count:st.count[s]};});
                    pC.update(nD);
                    leg.update(nD);
            }
        }
        
        function click(d){
            parentFilter.by = "Grade";
            parentFilter.value = d[0];
            cL.showButton();
        }
        // create function to update the bars. This will be used by pie-chart.
        hG.update = function(nD, color){
            // update the domain of the y-axis map to reflect change in grades.
            y.domain([0, d3.max(nD, function(d) { return d[1]; })]);
            
            // Attach the new data to the bars.
            var bars = hGsvg.selectAll(".bar").data(nD);
            
            // transition the height and color of rectangles.
            bars.select("rect").transition().duration(500)
                .attr("y", function(d) {return y(d[1]); })
                .attr("height", function(d) { return hGDim.h - y(d[1]); })
                .attr("fill", color);

            // transition the count labels location and change value.
            bars.select("text").transition().duration(500)
                .text(function(d){ return d3.format(",")(d[1])})
                .attr("y", function(d) {return y(d[1])-5; });            
        }        
        return hG;
    }
    
    // function to handle pieChart.
    function pieChart(pD){
        var pC:{update:any} = {update:()=>{}};    
        var pieDim:{w:number; h:number; r:number} ={w:240, h: 240, r: 0};
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
                
        // create svg for pie chart.
        var piesvg = d3.select(id).append("svg")
            .attr('class','pieChart')
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
        
        // create function to draw the arcs of the pie slices.
        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie = d3.layout.pie().sort(null).value(function(d) { return d.count; });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
            .each(function(d) { this._current = d; })
            .style("fill", function(d) { return segColor(d.data.type); })
            .on("mouseover",mouseover).on("mouseout",mouseout).on('click',click);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function(nD){
            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                .attrTween("d", arcTween);
        }        
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d){
            // call the update function of histogram with new data.
            hG.update(fData.map(function(v){ 
                return [v.Grade,v.count[d.data.type]];}),segColor(d.data.type));
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d){
            // call the update function of histogram.
            if(parentFilter.by === ''){
                hG.update(fData.map(function(v){
                    return [v.Grade,v.total];}), barColor);
            } else {
                hG.update(fData.map(function(v){
                    return [v.Grade,v.count[parentFilter.value]];}),segColor(parentFilter.value));
                
            }
        }
        //Utility function to be called on click a pie slice.
        function click(d){
            parentFilter.by = "Tries";
            parentFilter.value = d.data.type;
            cL.showButton();
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return arc(i(t));    };
        }    
        return pC;
    }
    
    // function to handle legend.
    function legend(lD){
        var leg:{update:any} = {update:""};
            
        // create table for legend.
        var legend = d3.select(id).append("table").attr('class','legend');
        
        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
            
        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
			      .attr("fill",function(d){ return segColor(d.type); });
            
        // create the second column for each segment.
        tr.append("td").attr("class","tries")
            .text(function(d){ return d.type;});

        // create the third column for each segment.
        tr.append("td").attr("class",'legendcount')
            .text(function(d){ return d3.format(",")(d.count);});

        // create the fourth column for each segment.
        tr.append("td").attr("class",'legendPerc')
            .text(function(d){ return getLegend(d,lD);});

        // Utility function to be used to update the legend.
        leg.update = function(nD){
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(nD);

            // update the grades.
            l.select(".legendcount").text(function(d){ return d3.format(",")(d.count);});

            // update the percentage column.
            l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});        
        }
        
        function getLegend(d,aD){ // Utility function to compute percentage.
            return d3.format("%")(d.count/d3.sum(aD.map(function(v){ return v.count; })));
        }

        return leg;
    }
    
    function clearButton(){
        var button = d3.select(id).append("button").attr('id','clear-button').style('display','none').text('Reset Filters').on('click', clearFilter);
        var cL:{showButton:any} = {showButton:()=>{button.style('display', 'block')}}; 
        
        function clearFilter(){
            parentFilter.by = '';
            parentFilter.value = '';
            pC.update(tF);
            leg.update(tF);
            hG.update(fData.map(function(v){
                return [v.Grade,v.total];}), barColor);
            button.style('display','none');
        }
        return cL;
    }

    // calculate total count by segment for all Grade.
    var tF = ['Flash','Second Go','Redpoint'].map(function(d){ 
      return {type:d, count: d3.sum(fData.map(function(t){ return t.count[d];}))}; 
    });    
  
    // calculate total count by Grade for all segment.
    var sF = fData.map(function(d){return [d.Grade,d.total];});

    var leg= legend(tF),  // create the legend.
        pC = pieChart(tF), // create the pie-chart.
        hG = histoGram(sF), // create the histogram.
        cL = clearButton(); //create the clear button.
  }

  ngOnInit() {
    this.logbookService.getLogbookTotals().subscribe(data => {
      this.dashboard('#dashboard',data, this.parentFilter);
    })
    
  }

}

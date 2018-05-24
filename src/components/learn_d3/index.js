import React, {Component} from 'react';
import * as d3 from 'd3';
import './index.scss';
import { setInterval, clearInterval } from 'timers';
import { zoom_to_domin } from './data';

export default class D3_example extends Component {

  constructor(){
    super();
    this.draw = this.draw.bind(this);
    this.path = [
      'M153 334',
      'C153 334 151 334 151 334',
      'C151 339 153 344 156 344',
      'C164 344 171 339 171 334',
      'C171 322 164 314 156 314',
      'C142 314 131 322 131 334',
      'C131 350 142 364 156 364',
      'C175 364 191 350 191 334',
      'C191 311 175 294 156 294',
      'C131 294 111 311 111 334',
      'C111 361 131 384 156 384',
      'C186 384 211 361 211 334',
      'C211 300 186 274 156 274'
    ]
  }

  state = {
    path: '',
    width: 930,
    height: 500,
  }

  componentDidMount(){
    let path_order = 1;
    // const timer = setInterval(() => {
    //   if(!this.pathEle){
    //     this.pathEle = document.getElementById("pathEle");
    //   }
    //   this.setState({path: this.path.slice(0, path_order).join(' ')}, () => {
    //     path_order++;
    //     if(path_order > this.path.length) clearInterval(timer);
    //   });
    // }, 1000);
    //this.draw_line();
    //this.zoom_to_domin();
    //this.pie_chart();
    this.know_generator();
  }

  draw(){
    const {path, width, height} = this.state;
    if(!this.pathEle){
      const svg = d3.select('.D3_example--content').append('svg'); 
      svg.attr('width', width)
        .attr('height', height);
      svg.append('path')
        .attr('d', path)
        .attr('id', 'pathEle')
        .attr('style', `fill: rgb(255,255,255); stroke-width: 2; stroke: rgb(0,0,155); opacity: .5;`);
    }else{
      this.pathEle.setAttribute('d', path);
    }
  }

  draw_line(){
    const {width, height} = this.state;
    var data = [1, 2, 3, 5, 8, 13, 21];
    var arcs = d3.pie()(data);
    const svg = d3.select('.D3_line').append('svg')   //添加svg元素
      .attr('width', width)        //设置属性
      .attr('height', height)
      .attr('style', 'background-color: #222;')
      .selectAll('mt_g')   //选择元素
      .data(arcs)     //初始化数据
      .enter();      //实例化元素
    let g = svg.append('g').attr('class', 'mt_g');
    g.append('circle')
      .attr('r', (d, i) => { return d.startAngle });
    g.append('text')
      .attr('value', (d, i) => { return d.value });
  }

  zoom_to_domin(){
    let svg = d3.select('.zoom_to_domin').append('svg')
      .attr('width', 960)        //设置属性
      .attr('height', 500);

    let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

    let parseDate = d3.timeParse("%b %Y");

    let x = d3.scaleTime().range([0, width]),   //创建时间线性比例尺
    y = d3.scaleLinear().range([height, 0]);    //创建定量线性比例尺

    let xAxis = d3.axisBottom(x),    //创建一个下边的轴
    yAxis = d3.axisLeft(y);        //创建一个左边的轴
    let ryAxis = d3.axisRight(y);

    let zoom = d3.zoom()
      .scaleExtent([1, 32])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      // .on("zoom", () => {
      //   let t = d3.event.transform, xt = t.rescaleX(x);
      //   g.select(".area").attr("d", area.x(function(d) { return xt(d.date); }));
      //   g.select(".axis--x").call(xAxis.scale(xt));
      // });
    
    let area = d3.area()   //创建一个面积
      .curve(d3.curveMonotoneX)   //设置曲线插值器，d3.curveMonotoneX--立方样条。假设y是单调的，保持x的单调性
      .x(function(d) { return x(d.date); })   //设置 x0 和 x1 访问器。
      .y0(height)  //设置基线的 y 访问器。
      .y1(function(d) { return y(d.price); });   //设置顶线的 y 访问器。

    svg.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);

    let g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let data = zoom_to_domin.map((d) => {
      d.date = parseDate(d.date);
      d.price = +d.price;
      return d;
    });
    console.log('随机数', d3.extent(data, function(d) { return d.date; }));
    x.domain(d3.extent(data, function(d) { return d.date; }));    //定义域
    y.domain([0, d3.max(data, function(d) { return d.price; })]);    //值域

      g.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);
    
      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
    
      g.append("g")
          .attr("class", "axis axis--y")
          .call(yAxis);
      
      g.append("g")
          .attr("class", "ss")
          .call(ryAxis);
    
      var d0 = new Date(2003, 0, 1),
          d1 = new Date(2004, 0, 1);
    
      // Gratuitous intro zoom!
      svg.call(zoom).transition()
          .duration(3500)
          .call(zoom.transform, d3.zoomIdentity
              .scale(width / (x(d1) - x(d0)))
              .translate(-x(d0), 0));
  }

  pie_chart(){
    let svg = d3.select('.pie_chart')
      .append('svg')
      .attr('width', 200)
      .attr('height', 200)
      .attr('style', "background-color: #ccc;");
    let g = svg.append('g');
    g.append('path')
      .attr('d', 'M100 100 C100 100, 100 100, 50 48 C72 0, 128 0, 148 48 C100 100, 100 100, 100 100')
      .attr('style', 'fill: #fff; stroke: red; stroke-width: 1;')
  }

  know_generator(){
    let data = [
      {
        name: 'javascript',
        proportion: 0.33
      },
      {
        name: 'java',
        proportion: 0.33
      },
      {
        name: 'perl',
        proportion: 0.34
      }
    ], lineData = [
      {date: new Date(2007, 3, 24), value: 93.24},
      {date: new Date(2007, 3, 25), value: 95.35},
      {date: new Date(2007, 3, 26), value: 98.84},
      {date: new Date(2007, 3, 27), value: 99.92},
      {date: new Date(2007, 3, 30), value: 99.80},
      {date: new Date(2007, 4,  1), value: 99.47},
    ];
    let arc = d3.arc(),
        pie = d3.pie().value((d) => d.proportion).padAngle(1),
        line = d3.line().x((d) => d.date).y((d) => d.value),
        area = d3.area();
    let svg = d3.select('.know_generator').append('svg')
        .attr('width', 600)
        .attr('height', 600)
        .attr('style', 'background-color: #ccc;')
      .append('g')
        .selectAll('.pie')
        .data(arc(pie(data)))
        .enter()
      .append('path')
        .attr('class', 'pie')
        .attr('d', arc(pie(data)))

    console.log('arc',arc(pie(data)));
    console.log('pie',pie(data));
    console.log('line',line(lineData));
    console.log('area',area(data));
  }

  render(){
    return (
      <div className="D3_example">
        <h2 className="D3_example--title">D3</h2>
        <div className="D3_example--content">
          
        </div>
        <div className="D3_line"></div>
        <div className="zoom_to_domin"></div>
        <div className="pie_chart"></div>
        <div className="know_generator"></div>
      </div>
    );
  }
}
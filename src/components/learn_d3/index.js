import React, {Component} from 'react';
import * as d3 from 'd3';
import './index.scss';
import { setInterval, clearInterval } from 'timers';

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
    const timer = setInterval(() => {
      if(!this.pathEle){
        this.pathEle = document.getElementById("pathEle");
      }
      this.setState({path: this.path.slice(0, path_order).join(' ')}, () => {
        path_order++;
        if(path_order > this.path.length) clearInterval(timer);
      });
    }, 1000);
    this.draw_line();
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
      .attr('r', (d, i) => { console.log('i:', i); return d.startAngle });
    g.append('text')
      .attr('value', (d, i) => { console.log('d:', d); return d.value });
  }

  render(){
    return (
      <div className="D3_example">
        <h2 className="D3_example--title">D3</h2>
        <div className="D3_example--content">
          {this.draw()}
        </div>
        <div className="D3_line"></div>
      </div>
    );
  }
}
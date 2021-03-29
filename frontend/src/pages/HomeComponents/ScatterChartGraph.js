import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

const dataHard = [
  { x: 28, y: 3.20 },
  { x: 29, y: 2.90 },
  { x: 150, y: 3.84 },
  { x: 210, y: 3.74 },
  { x: 78, y: 3.45 },
  { x: 140, y: 3.60 },
  { x: 54, y: 2.50 },
  { x: 65, y: 2.90 },
  { x: 123, y: 3.20 },
  { x: 110, y: 3.13 },
  { x: 89, y: 3.33 },
  { x: 124, y: 3.88 }
];

class ScatterChartGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      size: 0,
      students: []
    }
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/students")
        .then(res => {
          const data = res.data;
          //console.log(data);
          this.setState({students: data});
          this.setState({size: Object.keys(data).length});
        })
        .catch(err => { console.log(err)});
    } catch (error) {
      console.log(error)
    }
    
  }

  render() {
    return (
      <ScatterChart
        width={500}
        height={300}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="income" unit="K" />
        <YAxis type="number" dataKey="y" name="GPA" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={dataHard} fill="#8884d8" />
      </ScatterChart>
    );
  }
  
}

export default ScatterChartGraph;
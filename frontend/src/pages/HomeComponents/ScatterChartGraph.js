import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

const dataHard = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

class ScatterChartGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      size: 0,
      students: [],
      malestudents: [],
      femalestudents: []
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
      await axios
        .get("/api/students/male")
        .then(res => {
          const data = res.data;
          //console.log("Male student data:" + data);
          //console.log(data);
          this.setState({malestudents: data});
        })
        .catch(err => { console.log(err)});
      await axios
        .get("/api/students/female")
        .then(res => {
          const data = res.data;
          //console.log("Female student data:" + data);
          //console.log(data);
          this.setState({femalestudents: data});
        })
        .catch(err => { console.log(err)});
    } catch (error) {
      console.log(error)
    }
    
  }

  render() {
    return (
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={dataHard} fill="#8884d8" />
      </ScatterChart>
    );
  }
  
}

export default ScatterChartGraph;
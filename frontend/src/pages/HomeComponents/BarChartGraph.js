import axios from 'axios';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const hardData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

class BarChartGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      size: 0,
      malecount: 0,
      femalecount: 0,
      students: [],
      malestudents: [],
      femalestudents: []
    }
  }

  async formData() {
    //console.log("Total Students: " + this.state.size);
    //console.log("Total Students: " + this.state.size);
    //console.log("Total Students: " + this.state.size);

    const newData = [
      { name: "Male", value: this.state.malecount },
      { name: "Female", value: this.state.femalecount},
    ];
    this.setState({realData: newData});
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/students")
        .then(res => {
          const data = res.data;
          this.setState({students: data});
          this.setState({size: Object.keys(data).length});
        })
        .catch(err => { console.log(err)});
      await axios
        .get("/api/students/male")
        .then(res => {
          const data = res.data;
          this.setState({malestudents: data});
        })
        .catch(err => { console.log(err)});
      await axios
        .get("/api/students/female")
        .then(res => {
          const data = res.data;
          this.setState({femalestudents: data});
        })
        .catch(err => { console.log(err)});
        await this.formData();
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <>
      {this.state.realData.length > 0 && (
        <BarChart
          width={500}
          height={300}
          data={hardData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      )}
      </>
    );
  }
}

export default BarChartGraph;
import React, { PureComponent } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#C4270C', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class PieChartGraph extends PureComponent {
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
          this.setState({malecount: Object.keys(data).length});
        })
        .catch(err => { console.log(err)});
      await axios
        .get("/api/students/female")
        .then(res => {
          const data = res.data;
          this.setState({femalestudents: data});
          this.setState({femalecount: Object.keys(data).length});
        })
        .catch(err => { console.log(err)});
      await this.formData();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <h3>{this.state.size} students</h3>
        <h3>{this.state.malecount} male students</h3>
        <h3>{this.state.femalecount} female students</h3>
        {this.state.realData.length > 0 && (
          <PieChart width={400} height={400}>
            <Legend />
            <Pie
              data={this.state.realData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {this.state.realData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}
      </>
    );
  }
}

export default PieChartGraph;
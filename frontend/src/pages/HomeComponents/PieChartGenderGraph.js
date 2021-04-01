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

class PieChartGenderGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      size: 0,
      maleCount: 0,
      femaleCount: 0,
      otherCount: 0
    }
  }

  getGenderCount(arr, gen) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].gender === gen) {
        count++;
      }
    }
    return count;
  }

  async formData() {
    const newData = [
      { name: "Male", value: this.state.maleCount },
      { name: "Female", value: this.state.femaleCount },
      { name: "Other", value: this.state.otherCount }
    ];
    this.setState({realData: newData});
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/personas")
        .then(res => {
          const data = res.data;
          const maleNum = this.getGenderCount(data, "Male");
          const femaleNum = this.getGenderCount(data, "Female");
          const otherNum = this.getGenderCount(data, "Other");
          this.setState({size: Object.keys(data).length});
          this.setState({maleCount: maleNum});
          this.setState({femaleCount: femaleNum});
          this.setState({otherCount: otherNum});
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
        {this.state.realData.length > 0 && (
          <PieChart width={500} height={300}>
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

export default PieChartGenderGraph;
import React, { PureComponent } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#C4270C', '#FFBB28', '#FF8042', '#56D62B'];

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

class PieChartEthnicityGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      size: 0,
      whiteCount: 0,
      asianCount: 0,
      blackCount: 0,
      latinoCount: 0,
      otherCount: 0
    }
  }

  getWhiteCount(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].race === "White") {
        count++;
      }
    }
    return count;
  }

  getAsianCount(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].race === "Asian") {
        count++;
      }
    }
    return count;
  }

  getBlackCount(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].race === "Black") {
        count++;
      }
    }
    return count;
  }

  getLatinoCount(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].race === "Latino") {
        count++;
      }
    }
    return count;
  }

  getOtherRaceCount(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].race === "Other") {
        count++;
      }
    }
    return count;
  }

  async formData() {
    const newData = [
      { name: "White", value: this.state.whiteCount },
      { name: "Asian", value: this.state.asianCount},
      { name: "Black", value: this.state.blackCount},
      { name: "Latino", value: this.state.latinoCount},
      { name: "Other", value: this.state.otherCount},
    ];
    this.setState({realData: newData});
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/students")
        .then(res => {
          const data = res.data;
          const whiteNum = this.getWhiteCount(data);
          const asianNum = this.getAsianCount(data);
          const blackNum = this.getBlackCount(data);
          const latinoNum = this.getLatinoCount(data);
          const otherRaceNum = this.getOtherRaceCount(data);
          this.setState({size: Object.keys(data).length});
          this.setState({whiteCount: whiteNum});
          this.setState({asianCount: asianNum});
          this.setState({blackCount: blackNum});
          this.setState({latinoCount: latinoNum});
          this.setState({otherCount: otherRaceNum});
        
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

export default PieChartEthnicityGraph;
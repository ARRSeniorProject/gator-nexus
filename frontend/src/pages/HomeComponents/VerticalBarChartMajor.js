import axios from 'axios';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class VerticalBarChartMajor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      size: 0,
      'Computer Science' : 0,
      'Computer Engineering' : 0
    }
  }

  getMajorCount(arr, major) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].major.toUpperCase().localeCompare(major.toUpperCase())) {
        count++;
      }
    }
    return count;
  }

  async formData() {
    const newData = [
      {
        name: "Major",
        csValue: this.state.csCount,
        ceValue: this.state.ceCount
      }
    ];
    this.setState({realData: newData});
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/personas")
        .then(res => {
          const data = res.data;
          const csNum = this.getMajorCount(data, "Computer Science");
          const ceNum = this.getMajorCount(data, "Computer Engineering");
          this.setState({size: Object.keys(data).length});
          this.setState({csCount: csNum});
          this.setState({ceCount: ceNum});
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
        <BarChart
          layout="vertical"
          width={400}
          height={97}
          data={this.state.realData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend verticalAlign="bottom"/>
          <Bar dataKey="csValue" name="Computer Science" stackId="a" fill="#326fa8" />
          <Bar dataKey="ceValue" name="Computer Engineering" stackId="a" fill="#C4270C" />

        </BarChart>
      )}
      </>
    );
  }
}

export default VerticalBarChartMajor;
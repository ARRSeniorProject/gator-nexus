import axios from 'axios';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class VerticalBarChartGender extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      size: 0,
      'Male' : 0,
      'Female' : 0,
      'Other' : 0
    }
  }

  getGenderCount(arr, gender) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].gender === gender) {
        count++;
      }
    }
    return count;
  }

  async formData() {
    const newData = [
      {
        name: "Gender",
        maleValue: this.state.maleCount,
        femaleValue: this.state.femaleCount,
        otherValue: this.state.otherCount
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
        <BarChart
          layout="vertical"
          width={400}
          height={78}
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
          <Bar dataKey="maleValue" name="male" stackId="a" fill="#326fa8" />
          <Bar dataKey="femaleValue" name="female" stackId="a" fill="#C4270C" />
          <Bar dataKey="otherValue" name="other" stackId="a" fill="#FFBB28" />

        </BarChart>
      )}
      </>
    );
  }
}

export default VerticalBarChartGender;
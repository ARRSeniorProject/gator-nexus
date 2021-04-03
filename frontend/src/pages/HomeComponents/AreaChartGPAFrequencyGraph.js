import axios from 'axios';
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class AreaChartGPAFrequencyGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      year1_InternshipTrue: 0,
      year1_InternshipFalse: 0,
      year2_InternshipTrue: 0,
      year2_InternshipFalse: 0,
      year3_InternshipTrue: 0,
      year3_InternshipFalse: 0,
      year4_InternshipTrue: 0,
      year4_InternshipFalse: 0,
      year5_InternshipTrue: 0,
      year5_InternshipFalse: 0,
      year6_InternshipTrue: 0,
      year6_InternshipFalse: 0
    }
  }

  getInternshipTrueCount(arr, year) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].hasJob === true && arr[i].academicStanding === year) {
        count++;
      }
    }
    return count;
  }

  getInternshipFalseCount(arr, year) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].hasJob === false && arr[i].academicStanding === year) {
        count++;
      }
    }
    return count;
  }

  async formData() {
    const newData = [
      { name: "Year 1", 
        yes: this.state.year1_InternshipTrue, 
        no: this.state.year1_InternshipFalse },
      { name: "Year 2", 
        yes: this.state.year2_InternshipTrue, 
        no: this.state.year2_InternshipFalse },
      { name: "Year 3", 
        yes: this.state.year3_InternshipTrue, 
        no: this.state.year3_InternshipFalse },
      { name: "Year 4", 
        yes: this.state.year4_InternshipTrue, 
        no: this.state.year4_InternshipFalse },
      { name: "Year 5", 
        yes: this.state.year5_InternshipTrue, 
        no: this.state.year5_InternshipFalse },
      { name: "Year 6", 
        yes: this.state.year6_InternshipTrue, 
        no: this.state.year6_InternshipFalse }
    ];
    this.setState({realData: newData});
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/personas")
        .then(res => {
          const data = res.data;
          const yr1_True = this.getInternshipTrueCount(data, 1);
          const yr1_False = this.getInternshipFalseCount(data, 1);
          const yr2_True = this.getInternshipTrueCount(data, 2);
          const yr2_False = this.getInternshipFalseCount(data, 2);
          const yr3_True = this.getInternshipTrueCount(data, 3);
          const yr3_False = this.getInternshipFalseCount(data, 3);
          const yr4_True = this.getInternshipTrueCount(data, 4);
          const yr4_False = this.getInternshipFalseCount(data, 4);
          const yr5_True = this.getInternshipTrueCount(data, 5);
          const yr5_False = this.getInternshipFalseCount(data, 5);
          const yr6_True = this.getInternshipTrueCount(data, 6);
          const yr6_False = this.getInternshipFalseCount(data, 6);

          this.setState({size: Object.keys(data).length});
          this.setState({year1_InternshipTrue: yr1_True});
          this.setState({year1_InternshipFalse: yr1_False});
          this.setState({year2_InternshipTrue: yr2_True});
          this.setState({year2_InternshipFalse: yr2_False});
          this.setState({year3_InternshipTrue: yr3_True});
          this.setState({year3_InternshipFalse: yr3_False});
          this.setState({year4_InternshipTrue: yr4_True});
          this.setState({year4_InternshipFalse: yr4_False});
          this.setState({year5_InternshipTrue: yr5_True});
          this.setState({year5_InternshipFalse: yr5_False});
          this.setState({year6_InternshipTrue: yr6_True});
          this.setState({year6_InternshipFalse: yr6_False});
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
        <AreaChart
          width={500}
          height={300}
          data={this.state.realData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          className="graph"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="yes" stoke="#326fa8" fill="#326fa8" />
          <Area type="monotone" dataKey="no" stoke="#c73126" fill="#c73126" />
        </AreaChart>
      )}
      </>
    );
  }
}

export default AreaChartGPAFrequencyGraph;
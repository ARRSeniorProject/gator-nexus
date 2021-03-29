import axios from 'axios';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class BarChartAcademicStandingInternshipGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      year1_InternshipTrue: 0,
      year1_IternshipFalse: 0,
      year2_InternshipTrue: 0,
      year2_IternshipFalse: 0,
      year3_InternshipTrue: 0,
      year3_IternshipFalse: 0,
      year4_InternshipTrue: 0,
      year4_IternshipFalse: 0
    }
  }

  getInternshipTrueCount(arr, year) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].internship === true && arr[i].academicstanding === year) {
        count++;
      }
    }
    return count;
  }

  getInternshipFalseCount(arr, year) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].internship === false && arr[i].academicstanding === year) {
        count++;
      }
    }
    return count;
  }

  async formData() {
    const newData = [
      { name: "Year 1", 
        yes: this.state.year1_InternshipTrue, 
        no: this.state.year1_IternshipFalse },
      { name: "Year 2", 
        yes: this.state.year2_InternshipTrue, 
        no: this.state.year2_IternshipFalse },
      { name: "Year 3", 
        yes: this.state.year3_InternshipTrue, 
        no: this.state.year3_IternshipFalse },
      { name: "Year 4", 
        yes: this.state.year4_InternshipTrue, 
        no: this.state.year4_IternshipFalse },
    ];
    this.setState({realData: newData});
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/students")
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

          this.setState({size: Object.keys(data).length});
          this.setState({year1_InternshipTrue: yr1_True});
          this.setState({year1_IternshipFalse: yr1_False});
          this.setState({year2_InternshipTrue: yr2_True});
          this.setState({year2_IternshipFalse: yr2_False});
          this.setState({year3_InternshipTrue: yr3_True});
          this.setState({year3_IternshipFalse: yr3_False});
          this.setState({year4_InternshipTrue: yr4_True});
          this.setState({year4_IternshipFalse: yr4_False});
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
          <Legend align="center" verticalAlign="bottom" />
          <Bar dataKey="yes" fill="#326fa8" />
          <Bar dataKey="no" fill="#c73126" />
        </BarChart>
      )}
      </>
    );
  }
}

export default BarChartAcademicStandingInternshipGraph;
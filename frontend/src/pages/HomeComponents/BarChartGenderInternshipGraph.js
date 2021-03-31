import axios from 'axios';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class BarChartGenderInternshipGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      maleInternshipTrue: 0,
      maleInternshipFalse: 0,
      femaleInternshipTrue: 0,
      femaleInternshipFalse: 0,
      otherInternshipTrue: 0,
      otherInternshipFalse: 0
    }
  }

  getInternshipCount(arr, bool, gen) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].hasJob === bool && arr[i].gender === gen) {
        count++;
      }
    }
    return count;
  }

  async formData() {
    const newData = [
      { name: "Male", 
        yes: this.state.maleInternshipTrue, 
        no: this.state.maleInternshipFalse },
      { name: "Female", 
        yes: this.state.femaleInternshipTrue, 
        no: this.state.femaleInternshipFalse },
      { name: "Other", 
        yes: this.state.otherInternshipTrue, 
        no: this.state.otherInternshipFalse },
    ];
    this.setState({realData: newData});
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/personas")
        .then(res => {
          const data = res.data;
          const maleTrue = this.getInternshipCount(data, true, "Male");
          const maleFalse = this.getInternshipCount(data, false, "Male");
          const femaleTrue = this.getInternshipCount(data, true, "Female");
          const femaleFalse = this.getInternshipCount(data, false, "Female");
          const otherTrue = this.getInternshipCount(data, true, "Other");
          const falseFalse = this.getInternshipCount(data, false, "Other");
          this.setState({size: Object.keys(data).length});
          this.setState({maleInternshipTrue: maleTrue});
          this.setState({maleInternshipFalse: maleFalse});
          this.setState({femaleInternshipTrue: femaleTrue});
          this.setState({femaleInternshipFalse: femaleFalse});
          this.setState({otherInternshipTrue: otherTrue});
          this.setState({otherInternshipFalse: falseFalse});
        
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
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom"/>
          <Bar dataKey="yes" fill="#326fa8" />
          <Bar dataKey="no" fill="#c73126" />
        </BarChart>
      )}
      </>
    );
  }
}

export default BarChartGenderInternshipGraph;
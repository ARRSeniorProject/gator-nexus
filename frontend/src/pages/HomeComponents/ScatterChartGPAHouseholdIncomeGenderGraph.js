import React, { PureComponent } from 'react';
import { Legend, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

class ScatterChartGPAHouseholdIncomeGenderGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      size: 0,
      students: [],
      maleData: [],
      femaleData: [],
      otherData: []
    }
  }

  formData(arr) {
    var maleNodes = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].gender === "Male") {
        var mNode = {}
        mNode ["x"] = arr[i].householdIncome;
        mNode ["y"] = arr[i].gpa;
        maleNodes.push(mNode);
      }
    }
    this.setState({maleData: maleNodes});

    var femaleNodes = [];
    for (var j = 0; j < arr.length; j++) {
      if (arr[j].gender === "Female") {
        var fNode = {}
        fNode ["x"] = arr[j].householdIncome;
        fNode ["y"] = arr[j].gpa;
        femaleNodes.push(fNode);
      }
    }
    this.setState({femaleData: femaleNodes});

    var otherNodes = [];
    for (var k = 0; k  < arr.length; k ++) {
      if (arr[k ].gender === "Other") {
        var oNode = {}
        oNode ["x"] = arr[k ].householdIncome;
        oNode ["y"] = arr[k ].gpa;
        otherNodes.push(oNode);
      }
    }
    this.setState({otherData: otherNodes});
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/personas")
        .then(res => {
          const data = res.data;
          this.formData(data);
          this.setState({students: data});
          this.setState({size: Object.keys(data).length});
          //this.setState({realData: newData});
        })
        .catch(err => { console.log(err)});
    } catch (error) {
      console.log(error)
    }
    
  }

  render() {
    return (
      <>
      {this.state.maleData.length > 0 && 
      this.state.femaleData.length > 0 && 
      this.state.otherData.length > 0 && (
        <ScatterChart
          width={500}
          height={300}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Income" unit="" />
          <YAxis type="number" dataKey="y" name="GPA" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Male" data={this.state.maleData} fill="#326fa8" />
          <Scatter name="Female" data={this.state.femaleData} fill="#c73126" />
          
          <Scatter name="Other" data={this.state.otherData} fill="#700785" />
        </ScatterChart>
      )}
      </>
    );
  }
  
}

export default ScatterChartGPAHouseholdIncomeGenderGraph;
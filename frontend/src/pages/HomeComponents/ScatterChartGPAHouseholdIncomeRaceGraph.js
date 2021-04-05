import React, { PureComponent } from 'react';
import { Legend, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

class ScatterChartGPAHouseholdIncomeRaceGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      size: 0,
      students: [],
      whiteData: [],
      asianData: [],
      blackData: [],
      latinoData: [],
      nativeData: [],
      pacificIslanderData: [],
      otherData: [],
    }
  }

  buildArray(arr, race) {
    var nodes = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].race === race) {
        var n = {}
        n ["x"] = arr[i].householdIncome;
        n ["y"] = arr[i].gpa;
        nodes.push(n);
      }
    }
    return nodes;
  }

  formData(arr) {
    var whiteNodes = this.buildArray(arr, "White");
    this.setState({whiteData: whiteNodes});

    var asianNodes = this.buildArray(arr, "Asian");
    this.setState({asianData: asianNodes});

    var blackNodes = this.buildArray(arr, "Black");
    this.setState({blackData: blackNodes});

    var latinoNodes = this.buildArray(arr, "Hispanic or Latino");
    this.setState({latinoData: latinoNodes});

    var nativeNodes = this.buildArray(arr, "Native American");
    this.setState({nativeData: nativeNodes});

    var pacificIslandNodes = this.buildArray(arr, "Pacific Islander");
    this.setState({pacificIslanderData: pacificIslandNodes});

    var otherNodes = this.buildArray(arr, "Other");
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
      {this.state.whiteData.length > 0 && 
      this.state.asianData.length > 0 && 
      this.state.blackData.length > 0 && 
      this.state.latinoData.length > 0 && 
      this.state.nativeData.length > 0 && 
      this.state.pacificIslanderData.length > 0 && 
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
          <Scatter name="White" data={this.state.whiteData} fill="#0088FE" />
          <Scatter name="Asian" data={this.state.asianData} fill="#C4270C" />
          <Scatter name="Black" data={this.state.blackData} fill="#FFBB28" />
          <Scatter name="Latino" data={this.state.latinoData} fill="#FF8042" />
          <Scatter name="Native" data={this.state.nativeData} fill="#56D62B" />
          <Scatter name="P. Islander" data={this.state.pacificIslanderData} fill="#d203fc" />
          <Scatter name="Other" data={this.state.otherData} fill="#700785" />
        </ScatterChart>
      )}
      </>
    );
  }
  
}

export default ScatterChartGPAHouseholdIncomeRaceGraph;

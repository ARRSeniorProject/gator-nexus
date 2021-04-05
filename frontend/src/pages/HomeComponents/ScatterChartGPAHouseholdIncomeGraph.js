import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

class ScatterChartGPAHouseholdIncomeGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      size: 0,
      students: [],
      realData: []
    }
  }

  printInfo(arr) {
    var nodes = [];
    for (var i = 0; i < arr.length; i++) {
      var node = {}
      node ["x"] = arr[i].householdIncome;
      node ["y"] = arr[i].gpa;
      nodes.push(node);
    }
    //console.log(nodes);
    this.setState({realData: nodes});
    return nodes;
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/personas")
        .then(res => {
          const data = res.data;
          const newData = this.printInfo(data);
          this.setState({students: data});
          this.setState({size: Object.keys(newData).length});
          this.setState({realData: newData})
        })
        .catch(err => { console.log(err)});
    } catch (error) {
      console.log(error)
    }
    
  }

  render() {
    return (
      <>
      {this.state.realData.length > 0 && (
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
          <Scatter name="A school" data={this.state.realData} fill="#8884d8" />
        </ScatterChart>
      )}
      </>
    );
  }
  
}

export default ScatterChartGPAHouseholdIncomeGraph;
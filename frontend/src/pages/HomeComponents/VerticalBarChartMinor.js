import axios from 'axios';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class VerticalBarChartMinor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      size: 0
    }
  }

  getMinorCount(arr, minor) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].minor.toUpperCase().localeCompare(minor.toUpperCase())) {
        count++;
      }
    }
    return count;
  }

  async formData() {
    let newData = [
      {
        name: "Minor",
        das: this.state.minors[0][1],
        mathm: this.state.minors[1][1],
        none: this.state.minors[2][1],
        stats: this.state.minors[3][1],
        bot: this.state.minors[4][1],
        math: this.state.minors[5][1]
      }
    ];
    this.setState({realData: newData});
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/aggregate")
        .then(res => {

            const data = res.data;

          var minors = [];
        var addMinor = true;

        this.setState({minors: Object.entries(data.minors)});

        })
        .catch(err => { console.log(err)});
      await this.formData();
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    console.log(this.state.minors);

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
          <Bar dataKey="das" name="Digital Arts and Sciences" stackId="a" fill="#326fa8" />
          <Bar dataKey="mathm" name="Mathematics" stackId="a" fill="#C4270C" />
          <Bar dataKey="none" name="N/A" stackId="a" fill="#FFBB28" />
          <Bar dataKey="stats" name="Statistics" stackId="a" fill="#FF8042" />
          <Bar dataKey="bot" name="Botany" stackId="a" fill="#56D62B" />
          <Bar dataKey="math" name="Math" stackId="a" fill="#d203fc" />

        </BarChart>
      )}
      </>
    );
  }
}

export default VerticalBarChartMinor;
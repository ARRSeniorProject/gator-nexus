import axios from 'axios';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class BarChartRaceInternshipGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      size: 0,
      whiteCountYes: 0,
      whiteCountNo: 0,
      asianCountYes: 0,
      asianCountNo: 0,
      blackCountYes: 0,
      blackCountNo: 0,
      latinoCountYes: 0,
      latinoCountNo: 0,
      nativeCountYes: 0,
      nativeCountNo: 0,
      pacificIslanderCountYes: 0,
      pacificIslanderCountNo: 0,
      otherCountYes: 0,
      otherCountNo: 0
    }
  }

  getInternshipCount(arr, bool, race) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].hasJob === bool && arr[i].race === race) {
        count++;
      }
    }
    return count;
  }

  async formData() {
    const newData = [
      { name: "White", yes: this.state.whiteCountYes, no: this.state.whiteCountNo},
      { name: "Asian", yes: this.state.asianCountYes, no: this.state.asianCountNo},
      { name: "Black", yes: this.state.blackCountYes, no: this.state.blackCountNo},
      { name: "Latino", yes: this.state.latinoCountYes, no: this.state.latinoCountNo},
      { name: "Native", yes: this.state.nativeCountYes, no: this.state.nativeCountNo},
      { name: "P. Islander", yes: this.state.pacificIslanderCountYes, no: this.state.pacificIslanderCountNo},
      { name: "Other", yes: this.state.otherCountYes, no: this.state.otherCountNo},
    ];
    this.setState({realData: newData});
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/personas")
        .then(res => {
          const data = res.data;
          const whiteYes = this.getInternshipCount(data, true, "White");
          const whiteNo = this.getInternshipCount(data, false, "White");
          const asianYes = this.getInternshipCount(data, true, "Asian");
          const asianNo = this.getInternshipCount(data, false, "Asian");
          const blackYes = this.getInternshipCount(data, true, "Black");
          const blackNo = this.getInternshipCount(data, false, "Black");
          const latinoYes = this.getInternshipCount(data, true, "Hispanic or Latino");
          const latinoNo = this.getInternshipCount(data, false, "Hispanic or Latino");
          const nativeYes = this.getInternshipCount(data, true, "Native American");
          const nativeNo = this.getInternshipCount(data, false, "Native American");
          const pacificIslandYes = this.getInternshipCount(data, true, "Pacific Islander");
          const pacificIslandNo = this.getInternshipCount(data, false, "Pacific Islander");
          const otherRaceYes = this.getInternshipCount(data, true, "Other");
          const otherRaceNo = this.getInternshipCount(data, false, "Other");
          this.setState({size: Object.keys(data).length});
          this.setState({whiteCountYes: whiteYes});
          this.setState({whiteCountNo: whiteNo});
          this.setState({asianCountYes: asianYes});
          this.setState({asianCountNo: asianNo});
          this.setState({blackCountYes: blackYes});
          this.setState({blackCountNo: blackNo});
          this.setState({latinoCountYes: latinoYes});
          this.setState({latinoCountNo: latinoNo});
          this.setState({nativeCountYes: nativeYes});
          this.setState({nativeCountNo: nativeNo});
          this.setState({pacificIslanderCountYes: pacificIslandYes});
          this.setState({pacificIslanderCountNo: pacificIslandNo});
          this.setState({otherCountYes: otherRaceYes});
          this.setState({otherCountNo: otherRaceNo});
        
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

export default BarChartRaceInternshipGraph;
import axios from 'axios';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class VerticalBarChartRace extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      size: 0,
      whiteCount: 0,
      asianCount: 0,
      blackCount: 0,
      latinoCount: 0,
      nativeCount: 0,
      pacificIslanderCount: 0,
      otherCount: 0
    }
  }

  getRaceOrEthnicityCount(arr, race) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].race === race) {
        count++;
      }
    }
    return count;
  }

  async formData() {
    const newData = [
      { name: "Race", 
        whiteValue: this.state.whiteCount,
        asianValue: this.state.asianCount,
        blackValue: this.state.blackCount,
        latinoValue: this.state.latinoCount,
        nativeValue: this.state.nativeCount,
        pacificValue: this.state.pacificIslanderCount,
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
          const whiteNum = this.getRaceOrEthnicityCount(data, "White");
          const asianNum = this.getRaceOrEthnicityCount(data, "Asian");
          const blackNum = this.getRaceOrEthnicityCount(data, "Black");
          const latinoNum = this.getRaceOrEthnicityCount(data, "Hispanic or Latino");
          const nativeNum = this.getRaceOrEthnicityCount(data, "Native American");
          const pacificIslandNum = this.getRaceOrEthnicityCount(data, "Pacific Islander");
          const otherRaceNum = this.getRaceOrEthnicityCount(data, "Other");
          this.setState({size: Object.keys(data).length});
          this.setState({whiteCount: whiteNum});
          this.setState({asianCount: asianNum});
          this.setState({blackCount: blackNum});
          this.setState({latinoCount: latinoNum});
          this.setState({nativeCount: nativeNum});
          this.setState({pacificIslanderCount: pacificIslandNum});
          this.setState({otherCount: otherRaceNum});
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
          width={700}
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
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend verticalAlign="bottom"/>
          <Bar dataKey="whiteValue" name="white" stackId="a" fill="#326fa8" />
          <Bar dataKey="asianValue" name="asian" stackId="a" fill="#C4270C" />
          <Bar dataKey="blackValue" name="black" stackId="a" fill="#FFBB28" />
          <Bar dataKey="latinoValue" name="latino" stackId="a" fill="#FF8042" />
          <Bar dataKey="nativeValue" name="native" stackId="a" fill="#56D62B" />
          <Bar dataKey="pacificValue" name="p. Islander" stackId="a" fill="#d203fc" />
          <Bar dataKey="otherValue" name="Other" stackId="a" fill="#700785" />

        </BarChart>
      )}
      </>
    );
  }
}

export default VerticalBarChartRace;
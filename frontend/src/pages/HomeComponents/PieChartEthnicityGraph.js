import React, { PureComponent } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#C4270C', '#FFBB28', '#FF8042', '#56D62B', '#d203fc', 'j'];

class PieChartEthnicityGraph extends PureComponent {
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
      { name: "White", value: this.state.whiteCount },
      { name: "Asian", value: this.state.asianCount},
      { name: "Black", value: this.state.blackCount},
      { name: "Hispanic or Latino", value: this.state.latinoCount},
      { name: "Native American", value: this.state.nativeCount},
      { name: "Pacific Islander", value: this.state.pacificIslanderCount},
      { name: "Other", value: this.state.otherCount},
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
          <PieChart width={500} height={300}>
            <Legend />
            <Pie
              data={this.state.realData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {this.state.realData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}
      </>
    );
  }
}

export default PieChartEthnicityGraph;
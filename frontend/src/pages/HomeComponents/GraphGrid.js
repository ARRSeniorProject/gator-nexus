import React, { Component } from 'react';
import axios from 'axios';

import PieChartInternshipGraph from "./PieChartInternshipGraph";
import PieChartEthnicityGraph from "./PieChartEthnicityGraph";
import PieChartGenderGraph from "./PieChartGenderGraph";

import BarChartAcademicStandingInternshipGraph from "./BarChartAcademicStandingInternshipGraph";
import BarChartGenderInternshipGraph from "./BarChartGenderInternshipGraph";
import BarChartRaceInternshipGraph from "./BarChartRaceInternship";

import ScatterChartGPAHouseholdIncomeGraph from "./ScatterChartGPAHouseholdIncomeGraph";
import ScatterChartGPAHouseholdIncomeGenderGraph from "./ScatterChartGPAHouseholdIncomeGenderGraph";
import ScatterChartGPAHouseholdIncomeRaceGraph from "./ScatterChartGPAHouseholdIncomeRaceGraph";

import AreaChartGPAFrequencyGraph from "./AreaChartGPAFrequencyGraph";

class GraphGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      masterData: []
    }
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/personas")
        .then(res => {
          const data = res.data;
          this.setState({ masterData: data });
        })
        .catch(err => { console.log(err)});
      console.log(this.state.masterData);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="graph-grid">
        <div className="graph-wrap">
          <h3>Internship Participation</h3>
          <PieChartInternshipGraph passedData={this.state.masterData} className="graph"/>
        </div>
        <div className="graph-wrap">
          <h3>Ethncity</h3>
          <PieChartEthnicityGraph className="graph"/>
        </div>
        <div className="graph-wrap">
          <h3>Gender</h3>
          <PieChartGenderGraph className="graph"/>
        </div>
  
        <div className="graph-wrap">
          <h3>Internship Participation By Year</h3>
          <BarChartAcademicStandingInternshipGraph className="graph"/>
        </div>
        <div className="graph-wrap">
          <h3>Internship Participation By Gender</h3>
          <BarChartGenderInternshipGraph className="graph"/>
        </div>
        <div className="graph-wrap">
          <h3>Internship Participation By Race</h3>
          <BarChartRaceInternshipGraph className="graph"/>
        </div>
  
        <div className="graph-wrap">
          <h3>GPA vs Family Income</h3>
          <ScatterChartGPAHouseholdIncomeGraph className="graph"/>
        </div>
        <div className="graph-wrap">
          <h3>GPA, Family Income, Gender</h3>
          <ScatterChartGPAHouseholdIncomeGenderGraph className="graph"/>
        </div>
        <div className="graph-wrap">
          <h3>GPA, Family Income, Race</h3>
          <ScatterChartGPAHouseholdIncomeRaceGraph className="graph"/>
        </div>
  
        <div className="graph-wrap">
          <h3>Area Chart</h3>
          <AreaChartGPAFrequencyGraph className="graph"/>
        </div>
      </div>
    )
  }
}

export default GraphGrid;
import axios from 'axios';
import React, {Component} from 'react';
import VerticalBarChartRace from './HomeComponents/VerticalBarChartRace';
import VerticalBarChartMajor from './HomeComponents/VerticalBarChartMajor';
import VerticalBarChartGender from './HomeComponents/VerticalBarChartGender';
import {Container, Row, Col} from 'reactstrap';
import '../css/Analysis.css';

class Analysis extends Component {

  renderSwitch(param){
    if(param < 1)
      return "Non-College Student"

    switch(param){
      case 1:
        return "Freshman"
      case 2:
        return "Sophomore"
      case 3:
        return "Junior"
      case 4:
        return "Senior"
      default:
        return "Super Senior"
    }
  }

  constructor() {
    super();

    this.state = {
      data: []
    }
  }

  async componentDidMount() {
    try {
      axios.get('/api/aggregate').then(res => {
        var data = [];
        data = res.data;
        this.setState({data});
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  render() {

    var student = ["CSE", "N/A", 3.33, "Sophomore", "White", "20", "Male", "$50-70k", "20 hrs/week", "4 times"];
    var studentSkills = [".NET", "Java", "C++", "JavaScript", "Python"];
    var skills = [];

    return (
      <div className='home'>
        <div id='search'>
          <Container>
            <br></br>
            <Row>
              <Col>
                Results
              </Col>
            </Row>
            <br></br>
          </Container>
        </div>
        <div>
        <Container style={{width: '65%'}}>
        <div className='analysis'>
            <Row>
            <Col>
              <Row>
                <h3>Major</h3>
              </Row>
              <Row>
                {/* <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.data.majors}</h5> */}
                <VerticalBarChartMajor />
              </Row>
              <Row>
                <h3>Minor</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[1]}</h5>
              </Row>
              <Row>
                <h3>GPA</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(this.state.data.gpa * 100) / 100}</h5>
              </Row>
              <Row>
                <h3>Academic Standing</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.renderSwitch(Math.round(this.state.data.academicStanding))}</h5>
              </Row>
              <Row>
                <h3>Skills</h3>
              </Row>
              <Row>
                <Container>{skills}</Container>
              </Row>
            </Col>
            <Col style={{width: '1px'}}></Col>
            <Col>
              <Row>
                <h3>Ethnicity</h3>
              </Row>
              <Row>
                <VerticalBarChartRace/>
              </Row>
              <Row>
                <h3>Age</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(this.state.data.age)}</h5>
              </Row>
              <Row>
                <h3>Gender</h3>
              </Row>
              <Row>
                <VerticalBarChartGender/>
              </Row>
              <Row>
                <h3>Household Income</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;${Math.round(this.state.data.householdIncome)}&nbsp;&nbsp;/Yr</h5>
              </Row>
              <Row>
                <h3>Employment Status</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(this.state.data.employmentStatus)}&nbsp;&nbsp;Hrs/Wk</h5>
              </Row>
              <Row>
                <h3>Interview Preperation</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(this.state.data.interviewPreparationTime)}&nbsp;&nbsp;Hours</h5>
              </Row>
            </Col> 
            </Row>
          </div>
        </Container>
        </div>
      </div>
    )
  }
}

export default Analysis;
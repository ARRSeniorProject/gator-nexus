import axios from 'axios';
import React, {Component} from 'react';
import VerticalBarChartRace from './HomeComponents/VerticalBarChartRace';
import VerticalBarChartMajor from './HomeComponents/VerticalBarChartMajor';
import VerticalBarChartMinor from './HomeComponents/VerticalBarChartMinor';
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

  getCommonSkills() {
    var skills = this.state.data.skills;
    var topThree = {
      "one" : 0,
      "two" : 0,
      "three" : 0,
    };

    var topSkills = Object.entries(topThree);

    var tempKey1, tempKey2, tempValue1, tempValue2;

    for(var i = 0; i < Object.entries(skills).length; i++)
    {
      if(Object.entries(skills)[i][1] > topSkills[0][1])
      {
        tempKey1 = topSkills[0][0];
        tempValue1 = topSkills[0][1];
        tempKey2 = topSkills[1][0];
        tempValue2 = topSkills[1][1];

        topSkills[0][0] = Object.entries(skills)[i][0];
        topSkills[0][1] = Object.entries(skills)[i][1];
        topSkills[1][0] = tempKey1;
        topSkills[1][1] = tempValue1;
        topSkills[2][0] = tempKey2;
        topSkills[2][1] = tempValue2;
      }
      else if(Object.entries(skills)[i][1] > topSkills[1][1])
      {
        tempKey1 = topSkills[1][0];
        tempValue1 = topSkills[1][1];

        topSkills[1][0] = Object.entries(skills)[i][0];
        topSkills[1][1] = Object.entries(skills)[i][1];
        topSkills[2][0] = tempKey1;
        topSkills[2][1] = tempValue1;
      }
      else if(Object.entries(skills)[i][1] > topSkills[2][1])
      {
        topSkills[2][0] = Object.entries(skills)[i][0];
        topSkills[2][1] = Object.entries(skills)[i][1];
      }
    }

    this.setState({skills: [topSkills[0][0], topSkills[1][0], topSkills[2][0]]})
  }

  constructor() {
    super();

    this.state = {
      data: [],
      skills: []
    }
  }

  async componentDidMount() {
    try {
      axios.get('/api/aggregate').then(res => {
        var data = res.data;
        var skills = res.data.skills;
        this.setState({data});
        this.getCommonSkills();
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

    skills = this.state.skills.map((e) => {
      <div className='skill-card'>{e}</div>
    })

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
                <VerticalBarChartMajor />
              </Row>
              <br></br>
              <Row>
                <h3>Minor</h3>
              </Row>
              <Row>
                <VerticalBarChartMinor />
                {/* <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[1]}</h5> */}
              </Row>
              <br></br>
              <Row>
                <h3>GPA</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(this.state.data.gpa * 100) / 100}</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Academic Standing</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.renderSwitch(Math.round(this.state.data.academicStanding))}</h5>
              </Row>
              <br></br>
              <hr></hr>
              <br></br>
              <Row>
                <h3>Skills</h3>
              </Row>
              <Row>
                <Container>
                  {this.state.skills.map((e) => {
                    return <div className='skill-card'>{e}</div>
                  })}
                </Container>
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
              <br></br>
              <Row>
                <h3>Age</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(this.state.data.age)}</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Gender</h3>
              </Row>
              <Row>
                <VerticalBarChartGender/>
              </Row>
              <br></br>
              <Row>
                <h3>Household Income</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;${Math.round(this.state.data.householdIncome)}&nbsp;&nbsp;/Yr</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Employment Status</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(this.state.data.employmentStatus)}&nbsp;&nbsp;Hrs/Wk</h5>
              </Row>
              <br></br>
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
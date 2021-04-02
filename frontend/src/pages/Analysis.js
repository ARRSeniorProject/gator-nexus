import axios from 'axios';
import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import '../css/Analysis.css';

class Analysis extends Component {

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
        console.log(data);
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

    //for(var i=0;i<studentSkills.length;i++){
      var i = 0;
      skills.push(
        <Row>
          <Col><div className='skill-card'>{studentSkills[i]}</div></Col>
          <Col><div className='skill-card'>{studentSkills[++i]}</div></Col>
          <Col><div className='skill-card'>{studentSkills[++i]}</div></Col>
          <Col><div className='skill-card'>{studentSkills[++i]}</div></Col>
          <Col><div className='skill-card'>{studentSkills[++i]}</div></Col>
        </Row>
        
      )

    return (
      <div className='home'>
        <div id='search'>
          <Container>
            <Row>
              <Col>
                xxx Results
              </Col>
            </Row>
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
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[0]}</h5>
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
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[2]}</h5>
              </Row>
              <Row>
                <h3>Academic Standing</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[3]}</h5>
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
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[4]}</h5>
              </Row>
              <Row>
                <h3>Age</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[5]}</h5>
              </Row>
              <Row>
                <h3>Gender</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[6]}</h5>
              </Row>
              <Row>
                <h3>Household Income</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[7]}</h5>
              </Row>
              <Row>
                <h3>Employment Status</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[8]}</h5>
              </Row>
              <Row>
                <h3>Interview Preperation</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{student[9]}</h5>
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
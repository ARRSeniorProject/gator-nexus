import axios from 'axios';
import * as MdIcons from "react-icons/md";
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
// import {Container, Row, Col} from 'reactstrap';
import { withRouter } from "react-router";
import '../css/Directory.css';
import { Redirect } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col
} from 'reactstrap';
import { MdImportContacts } from 'react-icons/md';
import '../css/Analysis.css';

class StudentProfile extends React.Component {

    constructor() {
        super();
    
        this.state = {
         student: 0
        }
    }

    async componentDidMount(){
      this.setState({student: this.props.location.state.student});
    }

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


    render(){

      if(this.state.student != 0)
      {
        var skills = this.state.student.skills.map(e => {
          return <div className='skill-card'>{e}</div>
        });
      }

      console.log(this.state);

        return(
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
                <h5>&nbsp;&nbsp;&nbsp;&nbsp;<img src={this.state.student.profilePictureLink} height='150'/></h5>
              </Row>
              <br></br>
              <Row>
                <h3>Major</h3>
              </Row>
              <Row>
                <h5 id='text'>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.student.major}</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Minor</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.student.minor}</h5>
              </Row>
              <br></br>
              <Row>
                <h3>GPA</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.student.gpa}</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Academic Standing</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.renderSwitch(this.state.student.academicStanding)}</h5>
              </Row>
              <br></br>
              <hr></hr>
              <br></br>
              <Row>
                <h3>Skills</h3>
              </Row>
              <Row>
                <Container>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {skills}
                </Container>
              </Row>
            </Col>
            <Col style={{width: '1px'}}></Col>
            <Col>
              <Row>
                <h3>Ethnicity</h3>
              </Row>
              <Row>
                <h5 id='text'>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.student.race}</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Age</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.student.age}</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Gender</h3>
              </Row>
              <Row>
                <h5 id='text'>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.student.gender}</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Household Income</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;${this.state.student.householdIncome}&nbsp;&nbsp;/Yr</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Employment Status</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.student.employmentStatus}&nbsp;&nbsp;Hrs/Wk</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Interview Preperation</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.student.interviewPreparationTime}&nbsp;&nbsp;Hours</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Phone Number</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.student.phoneNumber}</h5>
              </Row>
              <br></br>
              <Row>
                <h3>Email</h3>
              </Row>
              <Row>
                <h5 id="text">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.student.email}</h5>
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

export default StudentProfile;
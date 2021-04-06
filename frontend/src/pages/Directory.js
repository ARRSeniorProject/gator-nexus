import axios from 'axios';
import * as MdIcons from "react-icons/md";
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
// import {Container, Row, Col} from 'reactstrap';
import { withRouter } from "react-router";
import '../css/Directory.css';
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

class Card extends React.Component {
  
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

  render() {
      return (
        <div className='card' style={{display: 'inline-block'}}> 
          { this.props.value.company }
          <hr style={{color: "#4A8FE099"}}></hr>
          {this.renderSwitch(this.props.value.academicStanding)}
          <br></br>
          {this.props.value.gpa}
        </div>
      );
  }
};

class Directory extends Component{

  constructor() {
    super();

    this.state = {
      data: [],
      size: 0,
      selectedYear: 0,
      selectedCompany: 0,
      selectedAge: 0,
      selectedGender: 0,
      selectedEthnicity: 0,
      selectedGPA: 0
    }
  }

  filter(e){
    if(this.state.selectedYear == 0)
      return this.companyFilter(e)
    else if(this.state.selectedYear == 5 && e.academicStanding >= this.state.selectedYear)
      return this.companyFilter(e)
    else if(e.academicStanding == this.state.selectedYear)
      return this.companyFilter(e)
  }

  companyFilter(e){
    if(this.state.selectedCompany == 0)
      return this.ageFilter(e)
    else if(e.company == this.state.selectedCompany)
      return this.ageFilter(e)
  }

  ageFilter(e){
    if(this.state.selectedAge == 0)
      return this.genderFilter(e)
    else if(this.state.selectedAge == 23 && e.age >= this.state.selectedAge)
      return this.genderFilter(e)
    else if(e.age == this.state.selectedAge)
      return this.genderFilter(e)
  }

  genderFilter(e){
    if(this.state.selectedGender == 0)
      return this.ethnicityFilter(e)
    else if(e.gender == this.state.selectedGender)
      return this.ethnicityFilter(e)
  }

  ethnicityFilter(e){
    if(this.state.selectedEthnicity == 0)
      return this.gpaFilter(e)
    else if(e.race == this.state.selectedEthnicity)
      return this.gpaFilter(e)
  }

  gpaFilter(e){
    if(this.state.selectedGPA == 0)
    {
      this.state.size++;
      return <Card className='card' value = {e} />
    }
    else{
      switch(this.state.selectedGPA){
        case "1":
          if(e.gpa < 0.5)
          {
            this.state.size++;
            return <Card className='card' value = {e} />
          }
          break;
        case "2":
          if(e.gpa >= 0.5 && e.gpa < 1)
          {
            this.state.size++;
            return <Card className='card' value = {e} />
          }
          break;
        case "3":
          if(e.gpa >= 1 && e.gpa < 1.5)
          {
            this.state.size++;
            return <Card className='card' value = {e} />
          }
          break;
        case "4":
          if(e.gpa >= 1.5 && e.gpa < 2)
          {
            this.state.size++;
            return <Card className='card' value = {e} />
          }
          break;
        case "5":
          if(e.gpa >= 2 && e.gpa < 2.5)
          {
            this.state.size++;
            return <Card className='card' value = {e} />
          }
          break;
        case "6":
          if(e.gpa >= 2.5 && e.gpa < 3)
          {
            this.state.size++;
            return <Card className='card' value = {e} />
          }
          break;
        case "7":
          if(e.gpa >= 3 && e.gpa < 3.5)
          {
            this.state.size++;
            return <Card className='card' value = {e} />
          }
          break;
        case "8":
          if(e.gpa >= 3.5 && e.gpa <= 4.00)
          { 
            this.state.size++
            return <Card className='card' value = {e} />
          }
          break;
        default:
          break;
      }
    }
  }

  async componentDidMount() {
    try {
      axios.get('/api/personas').then(res => {
        this.setState({data: res.data});
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  handleYearChange = event => {
    this.setState({size: 0, selectedYear: event.target.value});
  }

  handleCompanyChange = event => {
    this.setState({size: 0, selectedCompany: event.target.value});
  }

  handleAgeChange = event => {
    this.setState({size: 0, selectedAge: event.target.value});
  }

  handleGenderChange = event => {
    this.setState({size: 0, selectedGender: event.target.value});
  }

  handleEthnicityChange = event => {
    this.setState({size: 0, selectedEthnicity: event.target.value});
  }

  handleGPAChange = event => {
    this.setState({size: 0, selectedGPA: event.target.value});
  }

  clear = () => {
    document.getElementById('yearDropdown').value = 0
    this.setState({size: 0, selectedYear: 0});

    document.getElementById('companyDropdown').value = 0
    this.setState({size: 0, selectedCompany: 0});

    document.getElementById('ageDropdown').value = 0
    this.setState({size: 0, selectedAge: 0});

    document.getElementById('genderDropdown').value = 0
    this.setState({size: 0, selectedGender: 0});

    document.getElementById('ethnicityDropdown').value = 0
    this.setState({size: 0, selectedEthnicity: 0});

    document.getElementById('GPADropdown').value = 0
    this.setState({size: 0, selectedGPA: 0});
  }

  render() {

  this.state.size = 0;

  var cards = this.state.data.map((e, i, a) => this.filter(e));

  var companies = [];
  var addCompany = true;

  this.state.data.map(e => {
    for(var i = 0; i < companies.length; i++)
    {
      if(e.company == companies[i])
      {
        addCompany = false;
        break;
      }
    }

    if(addCompany)
      companies.push(e.company);

    addCompany = true;

  })  

  return (
      <div className='home'>
        <Navbar className="filter-bar">
          <Container>
            <MdIcons.MdFilterList />

            <div>

              Year:<select id = "yearDropdown" onChange={this.handleYearChange}>
                  <option value="0">All</option>
                  <option value="1">Freshman</option>
                  <option value="2">Sophomore</option>
                  <option value="3">Junior</option>
                  <option value="4">Senior</option>
                  <option value="5">Super Senior</option>
              </select>

              Company:<select id = "companyDropdown" onChange={this.handleCompanyChange}>
                  <option value="0">All</option>
                  {companies.map(e => {
                    return <option value={e}>{e}</option>
                  })}
              </select>

              Age:<select id = "ageDropdown" onChange={this.handleAgeChange}>
                  <option value="0">All</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23+</option>
              </select>

              Gender:<select id = "genderDropdown" onChange={this.handleGenderChange}>
                  <option value="0">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
              </select>

              Ethnicity:<select id = "ethnicityDropdown" onChange={this.handleEthnicityChange}>
                  <option value="0">All</option>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Hispanic or Latino">Latino</option>
                  <option value="Native American">Native</option>
                  <option value="Asian">Asian</option>
                  <option value="Pacific Islander">P. Islander</option>
                  <option value="Other">Other</option>
              </select>

              GPA:<select id = "GPADropdown" onChange={this.handleGPAChange}>
                  <option value="0">All</option>
                  <option value="1">0.00 - 0.49</option>
                  <option value="2">0.50 - 0.99</option>
                  <option value="3">1.00 - 1.49</option>
                  <option value="4">1.50 - 1.99</option>
                  <option value="5">2.00 - 2.49</option>
                  <option value="6">2.50 - 2.99</option>
                  <option value="7">3.00 - 3.49</option>
                  <option value="8">3.50 - 4.00</option>
              </select>

              <button onClick={this.clear}>Clear</button>

            </div>
            
          </Container>
        </Navbar>
        <div id='search'>
          <Container>
            <br></br>
            <Row>
              <Col>
                {this.state.size} Results
              </Col>
            </Row>
            <hr></hr>
          </Container>
        </div>
        <div>
        <Container className='home'>
          <Row>
          {cards}
          </Row>  
        </Container>
        </div>
      </div>
  );
}

};

export default Directory;
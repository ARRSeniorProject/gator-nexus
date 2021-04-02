import axios from 'axios';
import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import { withRouter } from "react-router";
import '../css/Directory.css';

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
      data: []
    }
  }

  async componentDidMount() {
    try {
      axios.get('/api/personas').then(res => {
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

  var arr=this.state.data;
  console.log(arr);
  var elements = [];

 //console.log(this.state.data);

//  arr.map((e, i) => 

//   {for(i=0;i<arr.length;i++){
//           elements.push(
//             <Row>
//               <Col><Card className='card' value = { arr[i]} /></Col>
//               <Col><Card className='card' value = { arr[++i]} /></Col>
//               <Col><Card className='card' value = { arr[++i]} /></Col>
//               <Col><Card className='card' value = { arr[++i]} /></Col>
//             </Row>
//           )
//       }}

//       )

  return (
      <div className='home'>
        <div id='search'>
          <Container>
            <br></br>
            <Row>
              <Col>
                {arr.length} Results
              </Col>
            </Row>
            <br></br>
          </Container>
        </div>
        <div>
        <Container className={this.props.state.sidebar ? 'home active' : 'home'}>
          <Row>
          {arr.map((e, i, a) =>
            <Row>
              <Col><Card className='card' value = {e} /></Col>
            </Row>
          )}
          </Row>  
        </Container>
        </div>
      </div>
  );
}

};

export default Directory;
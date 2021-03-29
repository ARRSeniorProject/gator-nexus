import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import '../css/Directory.css';

class Card extends React.Component {   

  render() {
      return (
          <div className='card' style={{display: 'inline-block'}}> 
          { this.props.value }
          </div>
      );
  }
};

class Directory extends Component{

  constructor() {
    super();
  }

  render() { 

  var arr=["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  var elements=[];
  for(var i=0;i<arr.length;i++){
          elements.push(
            <Row>
              <Col><Card className='card' value = { arr[i]} /></Col>
              <Col><Card className='card' value = { arr[++i]} /></Col>
              <Col><Card className='card' value = { arr[++i]} /></Col>
              <Col><Card className='card' value = { arr[++i]} /></Col>
            </Row>
          )
      }

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
        <Container className={this.props.state.sidebar ? 'home active' : 'home'}>
          {elements}
        </Container>
        </div>
      </div>
  );
}

};

export default Directory;
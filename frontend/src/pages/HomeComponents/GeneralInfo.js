import React, { PureComponent } from 'react';
import axios from 'axios';

class GeneralInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      size: 0
    }
  }

  async componentDidMount(){
    try {
      await axios
        .get("/api/personas")
        .then(res => {
          const data = res.data;
          this.setState({size: Object.keys(data).length});
        })
        .catch(err => { console.log(err)});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <div className="general-info">
          <h3>{this.state.size} Total Students</h3>
        </div>
      </>
    );
  }
}

export default GeneralInfo;
import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import * as MdIcons from "react-icons/md";
import { SideBarData } from './SideBarData';
import { IconContext } from 'react-icons';
import '../css/SideBar.css';

class SideBar extends Component{

  constructor() {
    super();
  }

  /*constructor() {
    super();
    this.state = {
      sidebar: false
    }
    this.handlechange = this.handlechange.bind(this);
  }

  handlechange() { 

    if(!this.state.sidebar)
    {
    this.setState({
      sidebar: true
    });
    }
    else
    {
      this.setState({
        sidebar: false
      });
    }

  }*/

  render() {

    //return(

// function SideBar() {

  // constructor() {
  //   super();
  //   this.state = {
  //     sidebar: false
  //   }
  //   this.handlechange = this.handlechange.bind(this);
  // }

  // handlechange() {
  //   this.setstate({
  //     sidebar: true
  //   });
  // }

  //const [sidebar, setSidebar] = useState(false);

  //const showSidebar = () => setSidebar(!sidebar);

  return(
    <>
    <IconContext.Provider value={{color: '#fff'}}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <MdIcons.MdMenu onClick={this.props.handlechange} />
        </Link>
      </div>
      <nav className={this.props.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={this.props.handlechange}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <MdIcons.MdClose />
            </Link>
          </li>
          {SideBarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  // )
/*}*/ )

  }

}
export default SideBar;
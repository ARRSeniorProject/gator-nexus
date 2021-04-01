import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as MdIcons from "react-icons/md";
import { SideBarData } from './SideBarData';
import { IconContext } from 'react-icons';
import '../css/SideBar.css';

function SideBar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return(
    <>
    <IconContext.Provider value={{color: '#fff'}}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <MdIcons.MdMenu onClick={showSidebar} />
        </Link>
        <div className="title">
          <h2>GatorNexus</h2>
        </div>
      </div>
      
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
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
  )
}

export default SideBar;
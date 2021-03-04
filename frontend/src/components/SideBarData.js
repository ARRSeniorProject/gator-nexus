import React from 'react';
import * as MdIcons from "react-icons/md";

export const SideBarData = [
  {
    title: "Homepage",
    path: "/",
    icon: <MdIcons.MdHome />,
    cName: 'nav-text'
  },
  {
    title: "Directory",
    path: "/directory",
    icon: <MdIcons.MdSearch />,
    cName: 'nav-text'
  },
  {
    title: "Analysis",
    path: "/analysis",
    icon: <MdIcons.MdAssessment />,
    cName: 'nav-text'
  },
  {
    title: "NewProfile",
    path: "/newprofile",
    icon: <MdIcons.MdAdd />,
    cName: 'nav-text'
  }
]
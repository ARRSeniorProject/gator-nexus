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
    path: "/api/directory",
    icon: <MdIcons.MdSearch />,
    cName: 'nav-text'
  },
  {
    title: "Analysis",
    path: "/api/analysis",
    icon: <MdIcons.MdAssessment />,
    cName: 'nav-text'
  },
  {
    title: "NewProfile",
    path: "/api/newprofile",
    icon: <MdIcons.MdAdd />,
    cName: 'nav-text'
  }
]
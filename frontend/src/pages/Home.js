import React from 'react';
import GeneralInfo from './HomeComponents/GeneralInfo';
import GraphGrid from './HomeComponents/GraphGrid';

function Home() {
  return (
    <div className='home-container'>
      <GeneralInfo />
      <GraphGrid />
    </div>
  )
}

export default Home;
import React from 'react';
import PieChartGraph from './HomeComponents/PieChartGraph';
import ScatterChartGraph from './HomeComponents/ScatterChartGraph';
import BarChartGraph from './HomeComponents/BarChartGraph';

function Home() {
  return (
    <div className='home-container'>
      <PieChartGraph />
      <BarChartGraph />
      <ScatterChartGraph />
    </div>
  )
}

export default Home;
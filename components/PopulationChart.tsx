import HighchartsReact from 'highcharts-react-official';
import { ChartOption } from '../hooks/useChartPopulation';
import React from 'react';
import Highcharts from 'highcharts';

export const PupulationChart = ({
  chartOption,
}: {
  chartOption: ChartOption;
}) => {
  return <HighchartsReact highcharts={Highcharts} options={chartOption} />;
};

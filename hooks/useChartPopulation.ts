import { Prefecture } from './../types/prefecture';
import { usePrefecturePopulation } from './usePrefecturePopulation';
import { useEffect, useState } from 'react';

export type PopulationChartData = {
  prefCode: string;
  dataList: number[];
};

export type ChartOption = {
  chart: {
    scrollablePlotArea: {
      minWidth: 700;
      scrollPositionX: 1;
    };
  };
  title: {
    text: string;
  };
  plotOptions: {
    series: {
      label: {
        connectorAllowed: boolean;
      };
      pointInterval: number;
      pointStart: number;
    };
  };
  yAxis: {
    tickWidth: 1;
    title: {
      text: string;
    };
    lineWidth: 1;
    opposite: boolean;
  };
  series: { name: string; data: number[] }[];
};

export const usePopulationChart = () => {
  const { fetchPupulationData } = usePrefecturePopulation();
  const options: ChartOption = {
    chart: {
      scrollablePlotArea: {
        minWidth: 700,
        scrollPositionX: 1,
      },
    },
    title: {
      text: '',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointInterval: 5,
        pointStart: 1960,
      },
    },
    yAxis: {
      tickWidth: 1,
      title: {
        text: '人口',
      },
      lineWidth: 1,
      opposite: false,
    },

    series: [],
  };

  const [chartOption, setChartOption] = useState<ChartOption>(options);

  const updateChartOptions = (prefecture: Prefecture) => {
    if (chartOption.series.find((data) => data.name === prefecture.prefName)) {
      const newSelectedPrefCodes = chartOption.series.filter((data) => {
        return data.name !== prefecture.prefName;
      });
      setChartOption({ ...chartOption, series: [...newSelectedPrefCodes] });
    } else {
      fetchPupulationData({ prefCode: prefecture.prefCode }).then((data) => {
        const dataList = data.result.data[0].data.map((allPopulationData) => {
          return allPopulationData.value;
        });

        chartOption.series.push({
          name: prefecture.prefName,
          data: dataList,
        });
        setChartOption({
          ...chartOption,
        });
      });
    }
  };

  return { updateChartOptions, chartOption };
};

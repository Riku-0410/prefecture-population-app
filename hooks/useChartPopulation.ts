import { usePrefecturePopulation } from './usePrefecturePopulation';
import { useEffect, useState } from 'react';

export type PopulationChartData = {
  prefCode: string;
  dataList: number[];
};

export type ChartOption = {
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
  series: { name: string; data: number[] }[];
};

export const usePopulationChart = () => {
  const { fetchPupulationData } = usePrefecturePopulation();
  const options: ChartOption = {
    title: {
      text: '人口増減率',
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
    series: [],
  };

  const [chartOption, setChartOption] = useState<ChartOption>(options);

  const updateChartOptions = (newSelectedPrefCode: string) => {
    if (chartOption.series.find((data) => data.name === newSelectedPrefCode)) {
      const newSelectedPrefCodes = chartOption.series.filter((data) => {
        return data.name !== newSelectedPrefCode;
      });
      setChartOption({ ...chartOption, series: [...newSelectedPrefCodes] });
    } else {
      fetchPupulationData({ prefCode: newSelectedPrefCode }).then((data) => {
        const dataList = data.result.data[0].data.map((allPopulationData) => {
          return allPopulationData.value;
        });

        chartOption.series.push({
          name: newSelectedPrefCode,
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

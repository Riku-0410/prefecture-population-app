import { Prefecture } from './../types/prefecture';
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
  scrollbar: {
    enabled: true;
  };
  responsive: {
    rules: [
      {
        condition: {
          minWidth: number;
        };
      },
    ];
  };
  series: { name: string; data: number[] }[];
};

export const usePopulationChart = () => {
  const { fetchPupulationData } = usePrefecturePopulation();
  const options: ChartOption = {
    title: {
      text: '都道府県別人口増減率',
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
    scrollbar: {
      enabled: true,
    },
    responsive: {
      rules: [
        {
          condition: {
            minWidth: 400,
          },
        },
      ],
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

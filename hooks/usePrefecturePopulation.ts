import { useEffect, useState } from 'react';
import { useFetch } from './useFetch';

type PopulationParams = {
  prefCode: string;
};

type ByYearPupulationData = {
  year: number;
  value: number;
};

type BoundaryPopulationData = {
  label: string;
  data: ByYearPupulationData[];
};
type PopulationResponse = {
  message?: string;
  result: {
    boundaryYear: number;
    data: BoundaryPopulationData[];
  };
};
export type PopulationChartData = {
  prefCode: string;
  dataList: number[];
};
export const usePrefecturePopulation = () => {
  const { get } = useFetch<PopulationResponse>();

  const [populationChartDataList, setPopulationChartDataList] = useState<
    PopulationChartData[]
  >([]);

  useEffect(() => {
    console.log(populationChartDataList);
  }, [populationChartDataList]);
  const makeChartOptions = (newSelectedPrefCode: string) => {
    if (
      populationChartDataList.find(
        (data) => data.prefCode === newSelectedPrefCode,
      )
    ) {
      const newSelectedPrefCodes = populationChartDataList.filter((data) => {
        return data.prefCode !== newSelectedPrefCode;
      });
      setPopulationChartDataList([...newSelectedPrefCodes]);
    } else {
      fetchPupulationData({ prefCode: newSelectedPrefCode }).then((data) => {
        const dataList = data.result.data[0].data.map((allPopulationData) => {
          return allPopulationData.value;
        });
        populationChartDataList.push({
          prefCode: newSelectedPrefCode,
          dataList: dataList,
        });
        setPopulationChartDataList([...populationChartDataList]);
      });
    }
  };

  const fetchPupulationData = (params: PopulationParams) => {
    const populationParams = new URLSearchParams(params);
    return get(
      'api/v1/population/composition/perYear' +
        `?${populationParams}&cityCode=-`,
    );
  };

  return { makeChartOptions, populationChartDataList };
};

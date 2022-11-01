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

export const usePrefecturePopulation = () => {
  const { get } = useFetch<PopulationResponse>();

  const fetchPupulationData = (params: PopulationParams) => {
    const populationParams = new URLSearchParams(params);
    return get(
      'api/v1/population/composition/perYear' +
        `?${populationParams}&cityCode=-`,
    );
  };

  return { fetchPupulationData };
};

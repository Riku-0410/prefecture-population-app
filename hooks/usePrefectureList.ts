import { useEffect, useState } from 'react';
import { Prefecture } from '../types/prefecture';
import { useFetch } from './useFetch';

type PrefectureList = {
  message?: string;
  result: Prefecture[];
};

export const usePrefectureList = () => {
  const { get } = useFetch<PrefectureList>();
  const [prefectureData, setPrefectureData] = useState<PrefectureList | null>(
    null,
  );
  const fetchPrefectureData = () => {
    get('api/v1/prefectures').then((data) => {
      console.log(data);
      setPrefectureData(data);
    });
  };

  useEffect(() => {
    fetchPrefectureData();
  }, []);
  return { prefectureData };
};

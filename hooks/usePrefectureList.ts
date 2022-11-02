import { useEffect, useRef, useState } from 'react';
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
    get('resasAPI/prefectures').then((data) => {
      setPrefectureData(data);
    });
  };

  const refFirstRef = useRef(true);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (refFirstRef.current) {
        fetchPrefectureData();
        refFirstRef.current = false;
        return;
      }
    }
  }, []);
  return { prefectureData };
};

import React from 'react';
import { usePrefectureList } from '../hooks/usePrefectureList';
import { Prefecture } from '../types/prefecture';
import { PrefectureCheckBox } from './PrefectureCheckBox';

export const PrefectureList = ({
  updateChartOptions,
}: {
  updateChartOptions: (prefecture: Prefecture) => void;
}) => {
  const { prefectureData } = usePrefectureList();
  return (
    <>
      {prefectureData?.result && (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {prefectureData.result.map((prefecture) => {
              return (
                <PrefectureCheckBox
                  key={prefecture.prefCode}
                  prefecture={prefecture}
                  updateChartOptions={updateChartOptions}
                ></PrefectureCheckBox>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

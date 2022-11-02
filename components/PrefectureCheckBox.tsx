import React from 'react';
import { useState } from 'react';
import { Prefecture } from '../types/prefecture';

export const PrefectureCheckBox = ({
  prefecture,
  updateChartOptions,
}: {
  prefecture: Prefecture;
  updateChartOptions: (prefecture: Prefecture) => void;
}) => {
  const [isSelectedPrefecture, setIsSelectedPrefecture] =
    useState<boolean>(false);
  const onSelectPrefecture = () => {
    setIsSelectedPrefecture(!isSelectedPrefecture);
    updateChartOptions(prefecture);
  };

  return (
    <>
      <div style={{ display: 'flex' }} onClick={onSelectPrefecture}>
        <input type="checkbox" checked={isSelectedPrefecture} readOnly={true} />
        <div key={prefecture.prefCode}>{prefecture.prefName}</div>
      </div>
    </>
  );
};

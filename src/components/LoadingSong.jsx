/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingSong = () => {
  return (
    <RotatingLines
      strokeColor="black"
      strokeWidth="5"
      animationDuration="0.75"
      width="24"
      visible={true}
    />
  );
}

export default memo(LoadingSong);
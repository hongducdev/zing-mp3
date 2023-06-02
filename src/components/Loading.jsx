/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { MutatingDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#4fa94d"
      secondaryColor="#4fa94d"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default memo(Loading);

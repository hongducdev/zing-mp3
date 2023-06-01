/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { Audio } from "react-loader-spinner";

const AudioLoading = () => {
  return (
    <Audio
      width={30}
      height={30}
      color="white"
      ariaLabel="audio loading"
      wrapperClass="wrapper-class"
      wrapperStyle={{}}
      visible={true}
    ></Audio>
  )
};

export default memo(AudioLoading);

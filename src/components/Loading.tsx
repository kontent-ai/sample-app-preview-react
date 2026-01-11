import React from "react";

export const Loading = (): JSX.Element => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin border-solid border-8 border-[#f3f3f3] rounded-full border-t-[#333333] w-32 h-32" />
    </div>
  );
};

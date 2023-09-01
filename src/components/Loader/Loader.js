import { TailSpin } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <>
      <TailSpin
        height="50"
        width="50"
        color="#3f51b5"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="loader"
        visible={true}
      />
    </>
  );
};

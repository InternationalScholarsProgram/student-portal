const AxiosError = ({ error }: any) => {
  return (
    <p>
      {error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred."}
    </p>
  );
};

export default AxiosError;

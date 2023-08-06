const AuthDispatcher = (returnData) => {
  if (returnData.success) {
    return {
      type: true,
      isLoading: false,
      user: returnData.user,
      isuserVerified: true,
    };
  }

  return {
    type: false,
    isLoading: false,
    user: [],
    isuserVerified: false,
  };
};

export { AuthDispatcher };

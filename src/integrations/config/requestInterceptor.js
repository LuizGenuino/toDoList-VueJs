

export default  {
  config(config) {
    const getToken = localStorage.getItem('ToDoList@token')
      config.headers["Authorization"] = `${getToken}`;
        return config;
  },

  error(error) {
    console.log("Interceptor Request Error: ", error);
    return Promise.reject(error);
  },
};

const setToken = (idToken: string) => {
    localStorage.setItem('id_token', idToken);
  }

const  getToken = () => {
    return localStorage.getItem('id_token');
  }

  const  removeToken = () => {
    return localStorage.removeItem('id_token');
  }

export {
    setToken,
    getToken,
    removeToken
}

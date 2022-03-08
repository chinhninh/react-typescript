const setToken = (idToken: string) => {
    localStorage.setItem('id_token', idToken);
  }

const  getToken = () => {
    return localStorage.getItem('id_token');
  }

  const  removeToken = () => {
    return localStorage.removeItem('id_token');
  }

  const setWorkspaceId = (id: string) => {
    localStorage.setItem('Workspace_id', id);
  }

const  getWorkspaceId = () => {
    return localStorage.getItem('Workspace_id');
  }

export {
    setToken,
    getToken,
    removeToken,
    setWorkspaceId,
    getWorkspaceId,
}

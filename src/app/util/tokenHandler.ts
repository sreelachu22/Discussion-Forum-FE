export class TokenHandler {
  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

  token = sessionStorage.getItem('token');

  getDecodedToken(token: string): any {
    // const token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      const payload = window.atob(token.split('.')[1]);
      const parsedToken = JSON.parse(payload);
      return parsedToken;
    } catch (error) {
      console.error('Error decoding token:', error); // Error decoding token
      return null;
    }
  }

  getNameFromToken(token: string): any {
    const parsedToken = this.getDecodedToken(token);
    return parsedToken.Name;
  }

  getEmailFromToken(token: string): any {
    const parsedToken = this.getDecodedToken(token);
    return parsedToken.Email;
  }

  getRoleFromToken(token: string): any {
    const parsedToken = this.getDecodedToken(token);
    return parsedToken.role;
  }

  getUserIdFromToken(token: string): any {
    const parsedToken = this.getDecodedToken(token);
    return parsedToken.UserId;
  }
}

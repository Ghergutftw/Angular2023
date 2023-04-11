export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn)
      }, 800)
    });
    return promise
  }

  login() {
    this.loggedIn = true
    console.log("LOGIN")
  }

  logout() {
    this.loggedIn = false
    console.log("LOGOUT")

  }
}

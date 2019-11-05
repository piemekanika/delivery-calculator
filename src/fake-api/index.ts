interface loginData {
  username: string
  password: string
}

function login ({ username, password }: loginData): Promise<any> {
  const token = '1fHFIAJSNxfwdfhqwwih83249832y4rhoehfo'
  const refresh_token = 'fhwqufh02fyr2hudnGHGU#GOb[EWPUfh'

  return new Promise((resolve, reject) => {
    if (username === 'user' && password === 'qwerty') {
      setTimeout(() => {  
        resolve({
          token,
          refresh_token,
          user_roles: ['ROLE_USER']
        })
      }, 700)
    } else if (username === 'admin' && password === 'root') {
      setTimeout(() => {  
        resolve({
          token,
          refresh_token,
          user_roles: ['ROLE_USER', 'ROLE_ADMIN']
        })
      }, 700)
    } else {
      setTimeout(() => {  
        reject({
          message: 'Username and password don\'t match any account'
        })
      }, 700)
    }
  })
}

export {
  login
}

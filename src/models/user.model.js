const USER_TYPE = {
  ANALYST: 'ANALYST',
  CUSTOMER: 'CUSTOMER'
}

class User {
  constructor({ name, email, type, token }) {
    this.name = name
    this.email = email
    this.type = USER_TYPE[type]
    this.token = token
  }
}

export { User, USER_TYPE }

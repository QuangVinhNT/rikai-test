type RegisterType = {
  email: string,
  username: string,
  password: string
}

type RegisterResponse = {
  message: string,
  data: {
    username: string,
    email: string
  }
}

type LoginType = {
  username: string,
  password: string
}

type LoginResponse = {
  message: string,
  data: {
    accessToken: string,
    user: {
      id: number,
      username: string
    }
  }
}

export type {
  RegisterType, LoginType, LoginResponse, RegisterResponse
}

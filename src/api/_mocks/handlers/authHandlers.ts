import { http, HttpResponse } from 'msw'

export const authHandlers = [
  http.post('/auth/login', async () => {
    // const body = await request.json();

    // if (body.login === 'test@test.com' && body.password === '123456') {
    // return HttpResponse.json({
    //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2RlQmxvZyIsInN1YiI6ImJlYUBlbWFpbCIsImp0aSI6IjNhNzc2YjIwLTA1MWItNDhiOS1hN2U2LTQ0YjUyNmM2MTg4NyIsImlkIjoiMDM5ZTc4OWQtNmJjNS00YjI2LThmYzItNzlhODA4MTMwMGUzIiwibmFtZSI6ImJlYSIsImV4cCI6MTc2Mzk0NDAzMn0.3h40xgHLJmoh-rO4K1b5IWqifeMYbWcZZF9TqpjPRw4"
    // });
    // }

    // return HttpResponse.json(
    //   { message: 'Credenciais inválidas' },
    //   { status: 401 }
    // );

    return HttpResponse.json({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2RlQmxvZyIsInN1YiI6ImJlYUBlbWFpbCIsImp0aSI6IjNhNzc2YjIwLTA1MWItNDhiOS1hN2U2LTQ0YjUyNmM2MTg4NyIsImlkIjoiMDM5ZTc4OWQtNmJjNS00YjI2LThmYzItNzlhODA4MTMwMGUzIiwibmFtZSI6ImJlYSIsImV4cCI6MTc2Mzk0NDAzMn0.3h40xgHLJmoh-rO4K1b5IWqifeMYbWcZZF9TqpjPRw4',
    })
  }),

  http.post('/auth/register', async () => {
    return HttpResponse.json({
      message: 'Usuário registrado com sucesso',
    })
  }),

  http.post('/auth/logout', () => {
    return HttpResponse.json({ success: true })
  }),
]

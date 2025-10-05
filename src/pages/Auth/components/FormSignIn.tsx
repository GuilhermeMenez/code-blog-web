import { useAuth } from "@/hooks/useAuth"
import { FormEvent, useState } from "react"

const SingInPage = () => {
    const {handleSignIn} = useAuth()
    const [login, setlogin] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit =  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleSignIn({ login, password })
    }
    
    return ( 
    <div>
      <h2>Login</h2> 
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="text"
              name="login"
              onChange={(e) => setlogin(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Senha:
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>


        <button type="submit">Login</button>
      </form>
    </div>)
}

export default SingInPage
import { useAuth } from "@/hooks/useAuth";
import { FormEvent, useState } from "react";

const SingUpPage = () => {
  const { handleSignUp } = useAuth(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSignUp({ name, email, password, userRole: "user" }); 
  };

  return (
    <div>
      <h2>Cadastro</h2> 
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="text"
              name="login"
              onChange={(e) => setEmail(e.target.value)}
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

        <div>
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SingUpPage;

import { useNavigate } from "react-router-dom";

export default function Login({ login, setLogin, loginUser }) {

  const navigate = useNavigate();

  return (
    <div className="center">
      <div className="card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e)=>setLogin({...login,email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setLogin({...login,password:e.target.value})}
        />

        <button onClick={()=>loginUser(navigate)}>Login</button>

        <p className="link" onClick={()=>navigate("/signup")}>
          Create new account
        </p>
      </div>
    </div>
  );
}
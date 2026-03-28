import { useNavigate } from "react-router-dom";

export default function Signup({ signup, setSignup, createAccount }) {

  const navigate = useNavigate();

  return (
    <div className="center">
      <div className="card">
        <h2>Create Account</h2>

        <input placeholder="First Name"
          onChange={(e)=>setSignup({...signup,first:e.target.value})} />

        <input placeholder="Last Name"
          onChange={(e)=>setSignup({...signup,last:e.target.value})} />

        <input placeholder="Email"
          onChange={(e)=>setSignup({...signup,email:e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={(e)=>setSignup({...signup,password:e.target.value})} />

        <input type="password" placeholder="Confirm Password"
          onChange={(e)=>setSignup({...signup,confirm:e.target.value})} />

        <button onClick={()=>createAccount(navigate)}>Create Account</button>

        <p className="link" onClick={()=>navigate("/login")}>
          Back to Login
        </p>
      </div>
    </div>
  );
}
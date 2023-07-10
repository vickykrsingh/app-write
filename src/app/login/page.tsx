"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter()

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled,setButtonDisabled] = React.useState(false)
  const [loading,setLoading] = React.useState(false)
  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login",user)
      console.log('Login success',response.data)
      toast.success("Login success")
      router.push('/profile')
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };
  React.useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center text-gray-400">
      <div className="w-full lg:w-2/3 xl:w-1/2 flex p-10 flex-col gap-2 bg-gray-800 py-20">
      <h1>{loading ? 'Processing...' : 'Login' }</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="cust-input"
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="cust-input"
      />
      <button disabled={buttonDisabled} className="cust-button disabled:cursor-not-allowed disabled:hover:bg-gray-600" onClick={onLogin}>{buttonDisabled ? 'No Login' : 'Login here'}</button>
      <Link className="text-center" href={"/signup"}>Visit signup page</Link>
    </div>
    </div>
  );
};

export default LoginPage;

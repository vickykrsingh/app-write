"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

type Props = {};

const SignUpPage = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled,setButtonDisabled] = React.useState(true)
  const [loading,setLoading] = React.useState(false)
  const onSignup = async () => {

    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup",user)
      router.push('/login')
      toast.success(response.data.message)
    } catch (error:any) {
      console.log('SignUp failed',error.message)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };

  React.useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center md:p-20 text-gray-400">
      <div className="w-full lg:w-2/3 xl:w-1/2 flex py-10 flex-col gap-2 bg-gray-800 px-10">
      <h1>{loading ? 'Processing...' : 'Signup'}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        className="cust-input"
      />
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
      <button disabled={buttonDisabled} className="disabled:cursor-not-allowed disabled:hover:bg-gray-600 cust-button" onClick={onSignup}>{buttonDisabled ? 'No signup':'Signup'}</button>
      <Link className="text-center" href={"/login"}>Visit login page</Link>
    </div>
    </div>
  );
};

export default SignUpPage;

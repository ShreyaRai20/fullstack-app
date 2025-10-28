'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!password){
            alert("password required")
            return
        }

        const res = await signIn("credentials", {
          email,
          password,
          redirect:false,
        })

        if(res?.error){
          console.log(res.error)
        }else{
          router.push('/')
        }

        
    }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col w-xl">
        <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit" className="bg-sky-500 p-2 rounded-xl">login</button>
      </form>
      <p>
        Dont have an account? <a href="/register">Register</a>
      </p>
      <button></button>
    </div>
  )
}

export default LoginPage

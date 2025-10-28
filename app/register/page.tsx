'use client'

import { useRouter } from "next/navigation"
import React, { useState } from "react"

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(password !== confirmPassword){
            alert("password mismatch")
            return
        }

        try {
            // react-query
            // loading, error, debounce
            const res = await fetch('/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await res.json()

            if(!res.ok){
                throw new Error(data.error || "Registeration failed")
            }

            router.push('/login')
        } catch (error) {
            alert(error)
        }
    }
  return (
    <div>
      <h1>Register</h1>
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
        <input
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="bg-green-800 p-2 rounded-xl">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  )
}

export default RegisterPage

'use server'
import { signIn, signOut } from "@/auth"
import {auth} from "@/auth"
import { redirect } from "next/navigation"

//Login with Githhub
export const loginwithGithub = async () => {
    await signIn('github', {redirectTo:'/'})
}

//Login with Google
export const loginwithGoogle = async () => {
    await signIn('google', {redirectTo:'/'})
}

export const logout = async() => {
    await signOut({redirectTo:'/sign-in'})
}

// Utility function to protect routes that require authentication
export const requireAuth = async () => {
    const session = await auth();
    if(!session){
        redirect('/sign-in');
    }

    return session
}

// Utility function to redirect authenticated users away from auth pages
export const redirectAuthenticatedUser = async () => {
    const session = await auth();
    if(session){
        redirect('/')
    }
}

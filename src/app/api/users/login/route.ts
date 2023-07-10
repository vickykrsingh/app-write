import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel"
import { NextRequest,NextResponse } from 'next/server'
import {default as bcryptjs} from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest){
    try {
        const {email,password} = await request.json()

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exists"},{status:500})
        }
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({
                error:'Invalid password'
            },{status:400})
        }

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        // create token
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET!,{expiresIn:"1d"})

        const response = NextResponse.json({
            message:"Login successfully",
            success:true
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}
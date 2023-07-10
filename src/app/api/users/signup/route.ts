import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel"
import { NextRequest,NextResponse } from 'next/server'
import {default as bcryptjs} from 'bcryptjs'

export async function POST(request:NextRequest){
    await connect()
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody
        console.log(reqBody)
        // check if user already exists
        const user = await User.findOne({email})
        
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })
        const savedUser = await newUser.save()

        return NextResponse.json({
            message:"User created successfully",
            savedUser
        },{status:200})

    } catch (error:any) {
        console.log(error)
        return NextResponse.json({
            error:error.message
        },{status:500})
    }
}
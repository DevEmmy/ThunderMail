import UserRepository from "../repositories/UserRepository";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { Service } from "typedi";
import "reflect-metadata"
import generateOTP from "../utils/generateOTP";

const jwtSecret: string = String(process.env.JWT_SECRET)

@Service()
class UserServices{
    constructor(private readonly userRepository : UserRepository
        ){}

    async signUp(data: any){
        try{
            let {email, password} = data
            let user: any = data;
            let hashedPassword = await bcrypt.hash(password, 6)
            user.password = hashedPassword
            user = await this.userRepository.save(user)
            return {
                message: "Signed Up Successfully",
                status:201,
                payload: user
            }
        }
        catch(err: any){
            return{
                ...err
            }
        }

    }

    async signIn(email: string, password: string){
        try{
            let user = {email, password};
            // change this any to an Interface
            let dbUser: any = await this.userRepository.findOneByEmail(email)
            let hashedPassword = await bcrypt.compare(password, dbUser.password)
            console.log(dbUser)
            if (hashedPassword){

                let token = jwt.sign({_id: dbUser._id, email}, jwtSecret)
                console.log(token)
                return {
                    message: "Signed In Successfully",
                    status: "200",
                    payload: {
                        dbUser, token
                    }
                }
            }
        }
        catch(err: any){
            console.log(err)
            return {
                ...err
            }
        }
    }

    async forgotPassword(email: string){
        try{
            let user: any = await this.userRepository.findOneByEmail(email)
            let resetCode =  generateOTP()
            user.resetCode = resetCode;
            user = await this.userRepository.update(user._id, user)
            // this.emailService.sendResetCode(email, resetCode)  

            return {
                payload: null,
                message: "Reset Code Sent"
            }
        } 
        catch(err: any){
            return {
                ...err
            }
        }
    }

    async resetPassword(email: string, resetCode: string){
        try{
            let user: any = await this.userRepository.findOneByEmail(email)
            if(user.email !== resetCode){
                return {
                    payload: null,
                    message: "Wrong Reset Code"
                }
            }

            user.resetCode = null;
            user = await this.userRepository.update(user._id, user)
            return {
                payload: user,
                message: "Confirmed Reset Code"
            }
        }   
        catch(err: any){
            return {
                ...err
            }
        }
    }

    async updateProfile(_id: string, userObject: object){
        try{
            let result = this.userRepository.update(_id, userObject)
            return {
                payload: result,
                message: "Updated!"
            }
        }
        catch(err: any){
            return {
                ...err
            }
        }
    }

    async getLoggedInUser(token: string){

    }

    async getUserById(id: string){
        let user = await this.userRepository.findOneById(id)
        return {
            payload: user,
            message: "Successful",
            status: 200
        }
    }

    async getUserByEmail(email:  string){
        let user = await this.userRepository.findOneByEmail(email);
        return {
            payload: user,
            message: "Successful",
            status: 200
        }
    }

    async getAllUsers(page: number, criteria: any ){
        let users = await this.userRepository.findAll(page, criteria)
        return {
            payload: users,
            message: "Sucessful",
            status: 200
        }
    }

    async deleteUser(id: string){
        let user = await this.userRepository.delete(id);
        return {
            payload: user,
            message: "Sucessful",
            status: 200
        }
    }

    

}

export default UserServices
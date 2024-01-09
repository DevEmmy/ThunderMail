import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import { IResult, error, success } from "../utils/returnResponses";
import { Service } from "typedi";
import "reflect-metadata"
import logger from "../utils/logger";

@Service()
class UserController {
    constructor( private readonly userService: UserServices){

    }

    async signUp(request: Request, response: Response){
        try{
            
            let data = request.body;
            let result: IResult = await this.userService.signUp(data)
            logger.info(result.message)
            success(result, response)
        }
        catch(err : any){
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async signIn(request: Request, response: Response){
        try{
            let {email, password} = request.body;
            let result: any = await this.userService.signIn(email, password)
            // console.log(result)
            // logger.info(result.message)
            success(result, response)
        }
        catch(err : any){
            logger.error(err.message);
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async update(request: Request, response: Response){
        try{
            const {id} = request.params
            const userObject = request.body;
            let result: IResult = await this.userService.updateProfile(id, userObject)
            logger.info(result.message)
            success(result, response)
        }
        catch(err: any){
            logger.error(err.message);
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async forgotPassword(request: Request, response: Response){
        try{
            let {email} = request.body;
            let result = await this.userService.forgotPassword(email)
            success(result, response)
        }
        catch(err: any){
            logger.error(err.message);
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async resetPassword(request: Request, response: Response){
        try{
            let {email, resetCode} = request.body;
            let result = await this.userService.resetPassword(email, resetCode)
            success(result, response)
        }
        catch(err: any){
            logger.error(err.message);
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async getUserById(request: Request, response: Response){
        try{
            let {id} = request.params;
            let result = await this.userService.getUserById(id)
            logger.info(result.message)
            success(result, response)
        }
        catch(err: any){
            logger.error(err.message);
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async deleteUser(request: Request, response: Response){
        try{
            let {id} = request.params;
            let result = await this.userService.deleteUser(id)
            success(result, response)
            logger.info(result.message)
        }
        catch(err: any){
            logger.error(err.message);
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async getAllUsers(request: Request, response: Response){
        try{
            let {page, criteria} = request.body;
            let result = await this.userService.getAllUsers(page, criteria)
            logger.info(result.message)
            success(result, response)
        }
        catch(err: any){
            logger.error(err.message);
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }
    
}


export default UserController
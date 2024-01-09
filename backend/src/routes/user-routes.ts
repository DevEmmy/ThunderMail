import { Request, Response, Router } from "express";
import Container from "typedi";
import UserController from "../controllers/UserController";
import verifyAuth from "../middlewares/verifyAuth";

const router = Router()

const userController = Container.get(UserController)

router.post("/sign-up", (req: Request, res: Response)=> userController.signUp(req, res))
router.post("/sign-in", (req: Request, res: Response)=> userController.signIn(req, res))
router.post("/forgot-password", (req: Request, res: Response)=> userController.forgotPassword(req, res))
router.post("/reset-password", (req: Request, res: Response)=> userController.resetPassword(req, res))
router.get("/:id", verifyAuth,(req: Request, res: Response)=> userController.getUserById(req, res))
router.delete("/:id", verifyAuth, (req: Request, res: Response)=> userController.deleteUser(req, res))
router.patch("/id", verifyAuth, (req: Request, res: Response)=> userController.update(req, res))
router.post("/", (req: Request, res: Response)=> userController.getAllUsers(req, res))

export default router
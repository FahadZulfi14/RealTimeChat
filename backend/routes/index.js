import  express  from 'express';
import user from '../controllers/userController.js';




const router = express.Router();



// router.use('/',upload.single('picture'), register);

router.use('/user', user);



export default router;
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default abstract class BaseController {

    
    public sendResponse(response, message, data):HttpContextContract{
        return response.status(200).json({
            success: true,
            message,
            data
        })
    }
        public sendError(response, message, data):HttpContextContract{
        return response.status(500).json({
            success: false,
            message,
            data
        })
    }
}



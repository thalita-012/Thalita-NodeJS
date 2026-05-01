export default class BaseController {
    success(res, data = null, message = 'Success') {
        return res.status(200).json({
            success: true,
            data,
            message
        });;

    }
    error(res, message = 'An error occurred', statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }

}
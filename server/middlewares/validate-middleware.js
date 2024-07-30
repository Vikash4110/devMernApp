const validate = (schema) => async (req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (error) {
      const status = 422; 
      const message = "Fill the Input Properly";
      const extraDetails = error.errors && error.errors.length > 0 ? error.errors[0].message : "Validation error";
  
      const errorResponse = {
        status,
        extraDetails,
        message,
      };
      console.log(errorResponse);
      res.status(422).json(errorResponse);
    }
  };
  
  module.exports = validate;
  
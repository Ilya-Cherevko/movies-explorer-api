const urlValidatorConfig = {
    require_protocol: true,
  };
  
  const jwtConfig = {
    expiresIn: '7d',
  };
  
  const schemaConfig = {
    versionKey: false,
  };
  
  const updateControllerConfig = {
    new: true,
    runValidators: true,
  };
  
  module.exports = {
    urlValidatorConfig,
    jwtConfig,
    schemaConfig,
    updateControllerConfig,
  };
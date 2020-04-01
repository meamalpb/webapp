

const isEmpty = (string) => {
    if(string.trim() == ''){ return true; }
    else{ return false; }
  }
  
  const isEmail = (string) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(string.match(emailRegEx))return true;
    else return false;
  }



  exports.validateSignupData = (newUser) => {
     let errors = {};
  if(isEmpty(newUser.email)){
    errors.email = "Must not be empty";
  }
  else if(!isEmail(newUser.email)){
    errors.email = "Enter valid email";
  }
  if(isEmpty(newUser.password)){
    errors.password = "Must not be empty";
  }
  if(newUser.confirmPassword != newUser.password){
    errors.confirmPassword = "passwords must match";
  }
  if(isEmpty(newUser.handle)){
    errors.handle = "Must not be empty"
  }

  return{
      errors,
      valid : Object.keys(errors).length === 0 ? true : false 
  }

  }
  
  exports.validateLoginData = (user) => {
    let errors = {};
    if(isEmpty(user.email)){
      errors.email = "Must not be empty";
    }
    if(isEmpty(user.password)){
      errors.password = "Must not be empty";
    }
    
  return{
    errors,
    valid : Object.keys(errors).length === 0 ? true : false 
}

  }

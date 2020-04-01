
const {db} = require('../utilities/admin');

const config = require('../utilities/config');

const firebase = require('firebase');

firebase.initializeApp(config);


const { validateSignupData,validateLoginData } = require('../utilities/validators');

exports.signup = (request,response) => {
    const newUser = {
        email : request.body.email,
        password : request.body.password, 
        confirmPassword : request.body.confirmPassword,
        handle : request.body.handle

    };
    
    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return res.status(400).json(errors);

      let token,userId

    db.doc(`/user/${newUser.handle}`).get()
    .then((doc) => {
        if(doc.exists){
          return  response.status(400).json({handle : 'this handle is already taken'});
        }
        else{
            return firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
        }
    })
    .then((data) =>{
      userId = data.user.uid
      return  data.user.getIdToken();
    })
    .then((token1) => {
      token = token1;
      const userCredentionals= {
          email : newUser.email,
          handle : newUser.handle,
          createdAt : new Date().toISOString(),
          userId
      }
      return db.collection("user").doc(`${newUser.handle}`).set(userCredentionals);
      })
       .then(() => {
        return response.status(201).json({ token });
       })
   
    .catch((error) => {
      console.log(error);
      if(error.code === 'auth/email-already-in-use'){
        return response.status(400).json({ email : "already in use"})
      }
      else{
        return response.status(500).json({error : error.code});
 
      }
    })
    //TODO validate data
    // return firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
    // .then((data) => {
    //     return response.json({message : `user ${data.user.uid} registered`})

    // })

}


exports.login = (request,response) => {
    const user = {
      email : request.body.email,
      password : request.body.password
    };

    const { valid, errors } = validateLoginData(user);

    if (!valid) return res.status(400).json(errors);

  
  
        firebase.auth().signInWithEmailAndPassword(user.email,user.password)
        .then((data) => {
          return data.user.getIdToken();
        })
        .then((token) => {
          return response.json({ token });
        })
        .catch((error) => {
          console.log(error);
          if(error.code === "auth/wrong-password"){
            return response.status(403).json({general : "wrong password"});
          }
          else{
            return response.status(500).json({error : error.code});
          }
        })
  
  
  
  }
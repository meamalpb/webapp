const {admin} = require('./admin');
const { db } = require('./admin');

module.exports = (request,response,next) => {
    let IdToken
    if(request.headers.authorization && request.headers.authorization.startsWith('Bearers ')){
      IdToken = request.headers.authorization.split('Bearers ')[1];
    }
    else{
      console.error('No token found');
      return response.status(403).json({error : 'unauthorized'});
    }
  
    admin.auth().verifyIdToken(IdToken)
    .then((decodedToken) => {
      request.user = decodedToken;
      console.log(decodedToken);
      return db.collection('user')
      .where('userId','==',request.user.uid)
      .limit(1)
      .get();
    })
  
    .then((data) => {
      request.user.handle = data.docs[0].data().handle;
      return next();
    })
    
    .catch((error) => {
      console.error('error while verifying token',error);
      return response.status(403).json(error);
    })
  }
  
  
  
const {db}=require('../utilities/admin');

exports.getAllScreams = (req, res) => {
  db.collection('screams')
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage
        });
        
      });
      console.log(screams);
      return res.json(screams);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};



exports.postOnescream = (request,response) => {
    if( request.body.body.trim === '' ){
      return response.status(400).json({body : 'Must not be empty '});
    }
        const newscream = {
          body : request.body.body,
          userHandle : request.user.handle,
          createdAt : new Date().toISOString()
      }
      db
      .collection("screams")
      .add(newscream)
      .then((doc) => {
          response.json({message : `doc ${doc.id} added`})
      })
      .catch((error) => {
        response.status(500).json({error : error.code});
      })
  }
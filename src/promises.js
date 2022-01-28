const promiseHell = () => {
  let userId;
  let postId;
  let db;

  db.then((u) => {
    return db.user().then((v) => v.json());
  })
    .then((u) => {
      userId = u.id;
      return db.post(userId).then((v) => v.json);
    })
    .then((p) => {
      postId = p.id;
      return db.comments(postId).then((v) => v.json());
    });
};

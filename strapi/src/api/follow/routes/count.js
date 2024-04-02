module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/follows/count/followers",
      handler: "follow.countFollowers",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/follows/count/followings",
      handler: "follow.countFollowings",
    },
  ],
};

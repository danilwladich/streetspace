"use strict";

/**
 * follow controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::follow.follow", {
  countFollowers(ctx) {
    var { URL } = ctx.request;
    const username = URL.searchParams.get("username");
    return strapi
      .query("api::follow.follow")
      .count({ where: { whomFollow: { username } } });
  },
  countFollowings(ctx) {
    var { URL } = ctx.request;
    const username = URL.searchParams.get("username");
    return strapi
      .query("api::follow.follow")
      .count({ where: { whoFollow: { username } } });
  },
});

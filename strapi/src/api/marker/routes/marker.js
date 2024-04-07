'use strict';

/**
 * marker router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::marker.marker');

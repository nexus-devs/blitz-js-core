/**
 * Class describing generic database/calculation methods
 * Any lower-level method extends this class
 */
class Endpoint {
  /**
   * Describes Endpoint properties
   */
  constructor (api, db, url) {
    /**
     * Default schema for API calls
     */
    this.schema = {
      scope: '',
      method: 'GET',
      description: 'There is no description for this endpoint yet.',
      limit: blitz.config[blitz.id].limit,
      query: []
    }
    this.api = api
    this.db = db
    this.url = url
  }

  /**
   * Publish Data for a specific endpoint
   */
  publish(data, endpoint = this.url) {
    let update = {
        endpoint,
        data
    }
    this.api.emit("publish", update)
    blitz.log.verbose("Core      | Sending data to publish for " + endpoint)
  }

  /**
   * Send data to be cached for endpoint on API node
   */
  cache(value, exp, key = this.url) {
    let data = {
        key,
        value,
        exp,
        scope: this.schema.scope
    }
    this.api.emit("cache", data)
    blitz.log.verbose("Core      | Sending data to cache for " + key)
  }
}

module.exports = Endpoint
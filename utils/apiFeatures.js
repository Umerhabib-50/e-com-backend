class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    this.query = this.query.find({});
    console.log(this.query);
  }
}

module.exports = ApiFeatures;

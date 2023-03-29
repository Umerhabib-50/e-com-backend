class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    console.log("from here api features class", this.query);
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
    // this.query = this.query.find({});
    // console.log(this.query);
    // this.query = this.query.find({});
    // return this.query;
  }
}

module.exports = ApiFeatures;

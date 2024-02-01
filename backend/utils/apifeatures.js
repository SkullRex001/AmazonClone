class ApiFeatures {
    constructor(query , queryStr) {
        this.query = query ;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword?{
            name:{
                $regex: this.queryStr.keyword,
                $options : 'i'

            }
        }:{}

        this.query = this.query.find({...keyword})  //doubt
        return this
    }

    filter() {
        const querycopy = {...this.queryStr};
        const removeFields = ["keyword" , "page" , "limit"]
        removeFields.forEach((key)=> delete querycopy[key]);
 
        this.query = this.query.find(querycopy);
        return this

    }
}

module.exports = ApiFeatures;
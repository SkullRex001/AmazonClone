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
        let querycopy = {...this.queryStr};
        const removeFields = ["keyword" , "page" , "limit"]
        removeFields.forEach((key)=> delete querycopy[key]);

        querycopy = JSON.stringify(querycopy)
        querycopy = querycopy.replace(/\b(gt|gte|lt|lte)\b/g , (key=> `$${key}`))
   
        this.query = this.query.find(JSON.parse(querycopy));
        return this

    }

    pagination(productPerPage){
        const currentPage = Number(this.queryStr.page)||1;
        
        const skip = productPerPage*(currentPage - 1)

        this.query = this.query.limit(productPerPage).skip(skip)
        return this;

    }
}

module.exports = ApiFeatures;
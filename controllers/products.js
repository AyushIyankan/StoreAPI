const Product = require("../models/product");

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    console.log(numericFilters);

    const regExp = /\b(<|<=|=|>|>=)/g;
    let filters = numericFilters.replace(
      regExp,
      (match) => `-${operatorMap[match]}-`
    );

    console.log(filters);

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);

  let result = Product.find(queryObject);

  if (sort) {
    const sortOptions = sort.split(",").join(" ");
    result = result.sort(sortOptions);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  return res.status(200).json({
    nbHits: products.length,
    products: products,
  });
};

const getAllProductsStatic = async (req, res, next) => {
  const products = await Product.find({ price: { $gt: 50 } }).sort("price");
  // .limit(10)
  // .skip(5);
  return res.status(200).json({
    nbHits: products.length,
    products,
  });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

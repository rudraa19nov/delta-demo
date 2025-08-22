const Joi= require("joi");//npm i joi //it helps to remove the prblm of hopscotch post reqs
//joi apply validation on individual fields
module.exports.listingSchema= Joi.object({
    listing: Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0).strict(false),
        // image:Joi.string().allow("",null),
      image: Joi.alternatives().try(
      Joi.string().pattern(/^[\w,\s-]+\.(jpg|jpeg|png|gif)$/i), // allow local file names
      Joi.string().uri(),  // allow full URLs
      Joi.object({
      url: Joi.string().required(),   // can be filename or URL depending on your design
      filename: Joi.string().optional()
  })
).required()


    }).required()
});
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
   rating: Joi.alternatives().try(
  Joi.number().integer().min(1).max(5),
  Joi.array().items(Joi.number().integer().min(1).max(5))
  ).required()
 }).required()
});

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product; // this is the standard way of defining a schema in Mongoose .

//
///
/* 
In this code, the "timestamps" option is an option passed to the Mongoose schema constructor that adds two additional fields
to the schema called "createdAt" and "updatedAt". These fields automatically get populated by Mongoose with the current date
and time when a new document is created and when an existing document is updated, respectively.

The "createdAt" and "updatedAt" fields are useful for tracking when a document was created and last updated
,which can be helpful for auditing and debugging purposes. These fields are stored as ISODate objects in the MongoDB database.
 */

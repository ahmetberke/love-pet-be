import User from './user.js';
import Pet from './pet.js';
import City from './city.js';
import Country from './country.js';
import Province from './province.js';
import Comment from './comment.js';
import TreatmentType from './treatment-type.js';
import Treatment from './treatment.js';
import Order from './order.js';
import Product from './product.js';
import Breed from './breed.js';
import ProductCategory from './product-category.js';
import UserType from './user-type.js';
import BreedType from './breed-type.js';
import './order-product.js';
import './forget-password.js';

function createModelsAndAssociations() {
  Country.hasMany(City, {
    foreignKey: 'countryId',
  });
  City.belongsTo(Country, {
    foreignKey: 'countryId',
  });

  Comment.hasMany(Comment, {
    foreignKey: 'parentCommentId',
  });
  Comment.belongsTo(Comment, {
    foreignKey: 'parentCommentId',
  });

  User.hasMany(Comment, {
    foreignKey: 'userId',
  });
  Comment.belongsTo(User, {
    foreignKey: 'userId',
  });

  User.hasMany(Order, {
    foreignKey: 'userId',
  });
  Order.belongsTo(User, {
    foreignKey: 'userId',
  });

  User.hasMany(Order, {
    foreignKey: 'userId',
  });
  Order.belongsTo(User, {
    foreignKey: 'userId',
  });

  Order.belongsToMany(Product, {through: 'OrderProduct'});
  Product.belongsToMany(Order, {through: 'OrderProduct'});

  User.hasMany(Pet, {
    foreignKey: 'userId',
  });
  Pet.belongsTo(User, {
    foreignKey: 'userId',
  });

  Breed.hasMany(Pet, {
    foreignKey: 'breedId',
  });
  Pet.belongsTo(Breed, {
    foreignKey: 'breedId',
  });

  ProductCategory.hasMany(Product, {
    foreignKey: 'productCategoryId',
  });
  Product.belongsTo(ProductCategory, {
    foreignKey: 'productCategoryId',
  });

  City.hasMany(Province, {
    foreignKey: 'cityId',
  });
  Province.belongsTo(City, {
    foreignKey: 'cityId',
  });

  TreatmentType.hasMany(Treatment, {
    foreignKey: 'treatmentTypeId',
  });
  Treatment.belongsTo(TreatmentType, {
    foreignKey: 'treatmentTypeId',
  });

  User.hasMany(Treatment, {
    foreignKey: 'userId',
  });
  Treatment.belongsTo(User, {
    foreignKey: 'userId',
  });

  Pet.hasMany(Treatment, {
    foreignKey: 'petId',
  });
  Treatment.belongsTo(Pet, {
    foreignKey: 'petId',
  });

  Treatment.hasMany(Comment, {
    foreignKey: 'treatmentId',
  });
  Comment.belongsTo(Treatment, {
    foreignKey: 'treatmentId',
  });

  Province.hasMany(User, {
    foreignKey: 'provinceId',
  });
  User.belongsTo(Province, {
    foreignKey: 'provinceId',
  });

  UserType.hasMany(User, {
    foreignKey: 'userTypeId',
  });
  User.belongsTo(UserType, {
    foreignKey: 'userTypeId',
  });

  BreedType.hasMany(Breed, {
    foreignKey: 'breedTypeId',
  });
  Breed.belongsTo(BreedType, {
    foreignKey: 'breedTypeId',
  });
}

export default createModelsAndAssociations;

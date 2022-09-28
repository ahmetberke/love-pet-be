import Country from '../models/country.js';
import City from '../models/city.js';
import Province from '../models/province.js';
import UserType from '../models/user-type.js';
import BreedType from '../models/breed-type';
import Breed from '../models/breed';
import User from '../models/user';
import {signToken} from '../middleware/auth';

async function initDbData() {
  await Country.bulkCreate(
      [{name: 'Turkey'}, {name: 'Germany'}, {name: 'France'}]);
  await City.bulkCreate([
    {name: 'Istanbul', countryId: 1},
    {name: 'Ankara', countryId: 1},
    {name: 'Munich', countryId: 2},
    {name: 'Berlin', countryId: 2},
    {name: 'Paris', countryId: 3},
    {name: 'Marseille', countryId: 3}]);
  await Province.bulkCreate([
    {name: 'Kagithane', cityId: 1},
    {name: 'Besiktas', cityId: 1},
    {name: 'Ulus', cityId: 2},
    {name: 'Kizilay', cityId: 2},
    {name: 'mun1', cityId: 3},
    {name: 'mun2', cityId: 3},
    {name: 'Ber1', cityId: 4},
    {name: 'Ber2', cityId: 4},
    {name: 'Par1', cityId: 5},
    {name: 'Par2', cityId: 5},
    {name: 'Marseille1', cityId: 6},
    {name: 'Marseille2', cityId: 6}]);
  await UserType.bulkCreate([{name: 'admin'}, {name: 'clinic'}, {name: 'customer'}]);
  await BreedType.bulkCreate([{name: 'cat'}, {name: 'dog'}, {name: 'bird'}]);
  await Breed.bulkCreate([{name: 'scottish', breedTypeId: 1},
    {name: 'golden', breedTypeId: 2}, {name: 'parrot', breedTypeId: 3}]);
  const user = await User.create({username: 'aykutovic', password: 'Tatar123',
    mail: 'aykut___1995@hotmail.com', phone: '5393556000', address: 'Besiktas',
    provinceId: 1, userTypeId: 2, rating: 0});
  const token = signToken({userId: user.id, userTypeId: user.userTypeId});
  return token;
}

export default initDbData;

import Country from '../src/models/country';
import City from '../src/models/city';
import Province from '../src/models/province';
import UserType from '../src/models/user-type';
import BreedType from '../src/models/breed-type';
import Breed from '../src/models/breed';
import User from '../src/models/user';
import {signToken} from '../src/middleware/auth';
import ForgetPassword from '../src/models/forget-password';
import hash from '../src/middleware/sha256-hasher';

async function populateDb() {
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
  await UserType.bulkCreate([{name: 'clinic'}, {name: 'customer'}]);
  await BreedType.bulkCreate([{name: 'cat'}, {name: 'dog'}, {name: 'bird'}]);
  await Breed.bulkCreate([{name: 'scottish', breedTypeId: 1},
    {name: 'golden', breedTypeId: 2}, {name: 'parrot', breedTypeId: 3}]);
  const user = await User.create({username: 'aykutovic', password: 'Tatar123',
    mail: 'aykut___1995@hotmail.com', phone: '5393556000', address: 'Besiktas',
    provinceId: 1, userTypeId: 2, rating: 0});
  await ForgetPassword.create({id: hash(user.id.toString() + 'uuid1test')});

  const token = signToken({userId: user.id, userTypeId: user.userTypeId});
  return token;
}

export default populateDb;

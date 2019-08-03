import './style/index.less';
import UserRegister from './user-register';
import SupplierRegister from './supplier-register'
import CarrierRegister from './carrier-register'

UserRegister.supplier = SupplierRegister
UserRegister.carrier = CarrierRegister

export default UserRegister
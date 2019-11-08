import './style/index.less';
import UserRegister from './user-register';
import SupplierRegister from './supplier-register'
import CarrierRegister from './carrier-register'
import PurchaseRegister from './purchase-register'


UserRegister.supplier = SupplierRegister
UserRegister.carrier = CarrierRegister
UserRegister.purchase= PurchaseRegister

export default UserRegister

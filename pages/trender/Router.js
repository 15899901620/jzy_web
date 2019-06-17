import rightinfor from './rightinfor'
import rightcode from './rightcode'

const routers = [
  { path: '/rightinfor',
    name: 'rightinfor',
    component: rightinfor,
  },
  { path: '/rightcode',
    name: 'rightcode',
    component: rightcode,
    params:{

    }
  }
]
export default routers



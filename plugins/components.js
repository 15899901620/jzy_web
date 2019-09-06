import Vue from 'vue'

import hotbidding from '~/components/hotbidding'

Vue.component('hotbidding', hotbidding)

export const amountFormat = amount => {
    return parseFloat(this.totalAmount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
}
Vue.prototype.amountFormat = amountFormat

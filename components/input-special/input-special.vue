<template>
    <div :class="classes">
        <div :class="prefixCls + '-handler-wrap'">
            <a style="" unselectable="unselectable"
                ref="up"
                @click="up"
                @mouse.down="preventDefault"
                :class="prefixCls + '-handler ' + prefixCls + '-handler-up ' + upDisabledClass ">
                <span unselectable="unselectable"
                    :class="prefixCls + '-handler-up-inner'"
                    @click="preventDefault">
                    <!-- <Icon type="ios-arrow-up" /> -->
                </span>
            </a>
            <a unselectable="unselectable"
                ref="down"
                @mouse.down="preventDefault"
                @click="down"
                :class="prefixCls + '-handler ' + prefixCls + '-handler-down '+ downDisabledClass ">
                <span unselectable="unselectable"
                    :class="prefixCls + '-handler-down-inner'"
                    @click="preventDefault">
                    <!-- <Icon type="ios-arrow-down" /> -->
                </span>
            </a>
        </div>
        <div :class="prefixCls + '-input-wrap'">
            <input
                ref="input"
                autoComplete="off"
                @focus="_onFocus"
                @blur="_onBlur"
                @keydown.stop="_onKeyDown"
                :class="prefixCls + '-input'"
                :autofocus="autoFocus"
                :readOnly="readOnly"
                :disabled="disabled"
                :max="max"
                :min="min"
                :value="relValue"
                @input="handleInput">
        </div>
    </div>
</template>

<script>
const prefixCls = 'ant-inputspecial'
//判断值是否是数字
function isValueNumber(value) {
    return !isNaN(Number(value));
}
// 自定义运算，解决精度问题
function calNum(num1, num2, symb) {
    let sq1;
    let sq2;
    try {
        sq1 = num1.toString().split('.')[1].length;
    } catch (e) {
        sq1 = 0;
    }
    try {
        sq2 = num2.toString().split('.')[1].length;
    } catch (e) {
        sq2 = 0;
    }
    const m = 10 ** Math.max(sq1, sq2);
    if (symb === '+') {
        return (num1 * m + num2 * m) / m;
    } else if (symb === '-') {
        return (Math.round(num1 * m) - Math.round(num2 * m)) / m;
    }
}
// 禁止源操作
function preventDefault(e) {
    e.preventDefault();
}
export default {
    name: 'InputSpecial',
    props: {
        //按钮放上下或左右
        position: {
            type: Boolean,
            default: true
        },
        max: {
            type: Number,
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        size: String,
        value: [Number, String],
        step: {
            type: Number,
            default: 1,
        },
        precision: {
            type: Number,
        },
        autoFocus: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readOnly: {
            type: Boolean,
            default: false,
        },

    },
    data() {
        return {
            prefixCls: 'ant-inputspecial',
            noop: () => {},
            preventDefault,
            upDisabledClass: '',
            downDisabledClass: '',
            currentValue: this.value,
            relValue: this.value,
            keyCode: null,
        };
    },
    computed: {
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-inputspecial`]: this.vertical },
            ];
        },
    },
    watch: {
        value(val) {
            this.relValue = val;
        },
        relValue(val) {
            if (isValueNumber(val)) {
                val = Number(val);
                if (val >= this.max) {
                    this.upDisabledClass = `${this.prefixCls}-handler-up-disabled`;
                } else if (val <= this.min) {
                    this.downDisabledClass = `${this.prefixCls}-handler-down-disabled`;
                } else {
                    this.upDisabledClass = '';
                    this.downDisabledClass = '';
                }
            } else {
                this.upDisabledClass = `${this.prefixCls}-handler-up-disabled`;
                this.downDisabledClass = `${this.prefixCls}-handler-down-disabled`;
            }
        }
    },
    mounted() {
        if (!this.currentValue) {
            this.currentValue = this.min;
        }
        if (this.relValue == null) {
            this.relValue = this.currentValue;
        }
        this.focused = this.autoFocus;
    },
    methods: {
        handleInput(event) {
            const e = event;
            if (isValueNumber(e.target.value)) {
                this.currentValue = e.target.value * 1;
            } else {
                e.target.value = this.relValue;
            }
            const curValue = event.target.value === '' ? event.target.value : (event.target.value * 1);
            this.setValue(curValue);
        },
        setValue(value) {
            if (value === this.relValue) return;

            this.relValue = value;
            this.$emit('input', value);
            this.$emit('change', value);
        },
        _onFocus() {
            this.focused = true;
        },
        _onKeyDown(e) {
            this.keyCode = e.keyCode;
            if (e.keyCode === 38) {
                this.up(e);
            } else if (e.keyCode === 40) {
                this.down(e);
            }
        },
        _onBlur(e) {
            if (e.target.value !== '') {
                if (e.target.value > this.max) {
                    if(this.step == 1){
                        e.target.value = this.max
                    }else{
                        e.target.value = Math.floor(this.max/this.step)*this.step
                    }

                    this.$emit('input', this.max);
                    this.$emit('change', this.max);
                    // this.dispatch('FormItem', 'form.change', [this.max]);
                } else if (e.target.value < this.min) {
                    e.target.value = this.min;
                    this.$emit('input', this.min);
                    this.$emit('change', this.min);
                    // this.dispatch('FormItem', 'form.change', [this.min]);
                } else if(this.step > 1){
                    e.target.value = this.min + Math.floor((e.target.value - this.min)/this.step)*this.step
                }
            }
            if (this.precision) {
                this.currentValue = Number(e.target.value).toFixed(this.precision) * 1;
            } else {
                this.currentValue = e.target.value * 1;
            }
            this.focused = false;
            if (e.target.value !== '') {
                this.setValue(this.currentValue);
            }
            // this.dispatch('FormItem', 'form.blur', [this.currentValue]);
        },
        down(e) {
            if (this.downDisabledClass) return;
            this.makeStep('down', e);
        },
        up(e) {
            if (this.upDisabledClass) {
                return;
            }
            this.makeStep('up', e);
        },
        makeStep(type) {
            if (this.disabled) return;
            let value = Number(this.relValue);
            const stepNum = Number(this.step);
            if (isNaN(value)) return;
            if (type === 'down') value = calNum(value, stepNum, '-');
            else if (type === 'up') value = calNum(value, stepNum, '+');
            if (value > this.max || value < this.min) return;
            value = this.precision ? Number(value).toFixed(this.precision) * 1 : value;
            this.setValue(value, () => {
                this.$refs.input.focus();
            });
        }
    }
}
</script>

<style>

</style>

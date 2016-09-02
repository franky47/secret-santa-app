import Vue from 'vue'
import ColorPicker from 'src/components/ColorPicker'

describe('ColorPicker.vue', () => {
    it('should render correct contents', () => {
        const vm = new Vue({
            data: () => ({ value: '#f00' }),
            template: '<div><color-picker :value.sync=\'value\'></color-picker></div>',
            components: { ColorPicker }
        }).$mount()

        const colorPicker = vm.$children[0]
        expect(colorPicker).to.have.property('value')
    })
})

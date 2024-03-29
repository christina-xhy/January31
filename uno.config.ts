import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno
} from 'unocss'
import transformerAttributifyJsx from './transformerAttributifyJsxOptions'

export default defineConfig({
  theme: {
  },
  shortcuts: {
    'j-btn': 'h-48px w-100% bg-#fda4af text-white b-none rounded-8px',
    'j-form': 'px-16px flex flex-col gap-y-8px children-flex children-flex-col ',
    'j-input-text': 'h-48px px-16px leading-32px py-8px b-#fda4af b-1 focus:shadow focus: shadow-inset rounded-8px text-18px',
    'j-form-label': 'text-18px mb-8px'
  },
  safelist: [],
  rules: [
    ['h-screen', { height: 'calc(100vh - var(--vh-offset, 0px))' }]
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
})

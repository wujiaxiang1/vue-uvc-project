import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  {
    rules: {
      // 组件名称由多个单词组成，忽略 index.vue
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index']    
        }
      ],
      // 关闭 props 解构的校验（props 会解构丢失响应式）
      'vue/no-setup-props-reactivity-loss': ['off'],
      // 使用未定义变量错误提示
      "vue/no-undef-properties": [  
        "error",
        {
          "ignores": ["/^\\$/"]
        }
      ]       
    }
  },

  skipFormatting
])

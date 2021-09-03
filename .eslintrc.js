module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        'prettier/prettier': [
            1,
            {
                trailingComma: 'es5',
                singleQuote: true,
                semi: false,
            },
        ],
        'no-inferrable-types': 2,
        // ...require('eslint-config-prettier').rules,
        // ...require('eslint-config-prettier/@typescript-eslint').rules,
    }
}
// http://eslint.cn/docs/user-guide/configuring
module.exports = {
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 8
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true 
    },
    "globals": {},
    "extends": "airbnb",
    "rules": {
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "max-len": ["error", { "comments": 200 }],
        "linebreak-style": 0,
        "indent": ["error", 4],
        "no-var": "off",
        "semi": ["error", "always"],
        "max-len": ["error", 180],
        "no-multi-spaces": ["error", { ignoreEOLComments: true }],
        "no-console": 0,
        "prefer-template": "warn",
        "prefer-destructuring": "warn",
        "arrow-parens": ["error", "always"],  // 要求箭头函数的参数始终使用圆括号
        "no-shadow": "warn",
        "no-return-assign": "off"
    }
};
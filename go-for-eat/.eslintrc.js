module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "react-native/react-native": true
    },
    "extends": ["plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "ecmaVersion":2017,
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};

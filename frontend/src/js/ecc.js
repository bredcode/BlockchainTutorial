// http://cryptocoinjs.com/modules/crypto/ecurve/
export const crypto = require('crypto')
export const BigInteger = require('bigi') // npm install --save bigi@1.1.0
export const ecurve = require('ecurve') // npm install --save ecurve@1.0.0
export const cs = require('coinstring') // npm install --save coinstring@2.0.0

export const ecparams = ecurve.getCurveByName('secp256k1')

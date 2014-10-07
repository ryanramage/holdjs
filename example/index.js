#!/usr/bin/env node

// example usages

// generate some keys
// openssl genrsa -out private_key32.pem 32
// openssl rsa -text -in private_key32.pem


// ./example/index.js pk 3594340021 2681913225
// ./example/index.js encrypt 3594340021 12832
// ./example/index.js d10 7
// ./example/index.js sign 3232


var tale_phreak = require('..');

var action = process.argv[2];

if (action === 'pk') {

  var private_exponent = process.argv[3];
  var modulus = process.argv[4];
  var packet = ['#0#', modulus, 'c', private_exponent ,'*'].join('');
  console.log('packet', packet);
  tale_phreak.dial(packet);
}

if (action === 'encrypt'){
  var publicExponent = '65537'; // default rsa process.argv[2]
  var code = process.argv[3];
  var modulus = process.argv[4];

  var ct = tale_phreak.encrypt(code, publicExponent, modulus);
  var packet = tale_phreak.encryption_packet(ct);
  console.log('packet', packet);
  tale_phreak.dial(packet);
}

if (action === 'sign'){
  var digits = process.argv[3]
  var packet = tale_phreak.sign_packet(digits);
  console.log('phreak code', packet);
  tale_phreak.dial(packet);
}

if (action === 'd10'){
  var num_dice = process.argv[3]
  var packet = tale_phreak.roll_d10_packet(num_dice);
  console.log('phreak code', packet);
  tale_phreak.dial(packet);
}

if (action == 'verify'){
  var msg = process.argv[3];
  var sig = process.argv[4];
  var modulus = process.argv[5];
  var publicExponent = '65537';

  var confirmed = tale_phreak.verify_sig(msg, sig, publicExponent, modulus);
  console.log('verified', confirmed);
}




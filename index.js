var bn = require('jsbn');
var baudio = require('baudio');
var touchtone = require('touchtone');


exports.encrypt = function(code, publicExponent, modulus) {
  var n = new bn(modulus);
  var m = new bn(code);
  var e = new bn(publicExponent);

  var test = n.subtract(m);
  if (test.s < 0) throw 'code must be smaller than modulus'

  return (new bn(code).modPowInt(new bn(publicExponent), new bn(modulus))).toRadix(10);
}

exports.verify_sig = function(msg, sig, publicExponent, modulus){
  var n = new bn(modulus);
  var e = new bn(publicExponent);
  var M = new bn(msg);
  var S = new bn(sig);

  var right = M.mod(n)
  //var left = S.pow(e)
  //return (right.equals(rolls));
  //console.log(right.toString());
  var result = S.modPowInt(e, n);
  return result.equals(M);
}


exports.encryption_packet = function(ct){
  return ['#1#',ct,'*'].join('')
}

exports.sign_packet = function(digits) {
  return ['#2#',digits,'*'].join('')
}

exports.roll_d10_packet = function(num_dice) {
  return ['#3#',num_dice,'*'].join('')
}



exports.dial = function(packet){

  var tone = touchtone();
  tone.dial(packet);
  tone.on('ready', function () { b.end() });
  var b = baudio(tone.play());
  b.play();

}

exports.decrypt = function(ct, privateExponent, modulus) {
  return (new bn(ct).modPowInt(new bn(privateExponent), new bn(modulus))).toString();
}

exports.sign_level = function(level, privateExponent, modulus){
  return (new bn(level).modPowInt(new bn(privateExponent), new bn(modulus))).toString();
}







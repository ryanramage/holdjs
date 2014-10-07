Hold JS
=======

This module is to be used to generate messages for [Hold](https://github.com/ryanramage/hold) hardware.

## About

It's really hard to ensure someone has made it to a location.

Lets say we want Alice to get to a location. Maybe even prove she has been there.
Hold lets this happen, and further, allows you to give a message to Alice only when she has reached that hold.

Hold is a device that you can fasten to a location. It will have a public/private key.
You write a message to Alice, encrypt it with the Hold public key and send the message to Alice.

Alice will take the message to the Hold device, and then be able to decrypt the message.


## Why

Here are some use cases:

  - Prove that you have climbed a mountain. Put a Hold on the top. People forevermore can prove they made it up!
  - Area Games. I want to make location based games over large areas. This will allow for reusable checkpoints.
  - Location based messages. Make people come to your library, musuem, store, or whatever!

API
---

    var hold = require('holdjs');

    var ct = hold.encrypt(code, publicExponent, modulus);
    var is_valid = hold.verify_sig(msg, sig, publicExponent, modulus);


    var packet = hold.encryption_packet = function(ct);
    var packet = hold.sign_packet(digits);
    var packet = hold.roll_packet(num_dice);

    hold.dial(packet);





# Cryptography (+ scripting)

Cryptography represent all the process used to insure the Confidentiality, the Authenticity and the Integrity of information.
Warning : encryption != encoding ! When you encrypt data, you make sure that is only understandable by your targeted correspondants. When you encode a data, you transform it to another form to facilitate its use. For example, the base64 encoding is used in a lot of web applications (because it represents data with ascii characters only), but it is meant to be secure : anyone who has access to base64 data can decode it !

Some words you should know :

* plaintext : unencrypted data
* cipher : generic name for encryption algorithm
* ciphertext : output of a cipher

In this workshop, we are going to discover two topics of Cryptography :

* substitution ciphers
* block encryption

# Substitution ciphers

Substitution ciphers are really basic cryptographic algorithms which basically replace a unit (can be a letter or a group of letter) to another unit.

A basic substitution can be made by setting a different alphabet for the ciphertext, ex :

```
alphabet : ABCDEFGHIJKLMNOPQRSTUVWXYZ  FLAG
alphabet : BDACIGHFEJKLMNOQPRUSVTZYWX  GLBH
```

The most famous substitution algorithm is the CEASAR cipher which shifts the beginning of the alphabet.

### Challenge

Your job is to code a python script which takes as input a ceasar ciphertext and outputs the original plaintext.
The only info you have is that the original plaintext was written in English.

Uncipher this with your Python script : `XVPHXDPXCCQNOUJPHXDPXCCQNODLTRWPOUJPHXDJANJYAXLAHYCXPAJYQNAHXDJANCQNLQJVYRXWPXOUJPCQRBXWYFWQOXDALCOMBRCNARPQCWXFHXDURCCUNYXCJCX`

*Challenge name : Caesar Salad*

For this exercice, you should only focus on the strings with caps.

# Block encryption

In this part, we will study how to implement block mode of operation for symetric encryption. First of all we have to define our cipher, in the previous part the cipher was an alphabet shift, here it will simply be a xor.

Thus if you have *plaintext*, *key* and *ciphertext*, we can describe our xor cipher like this :

`plaintext ^ key = ciphertext` and thanks to xor properties, this is equivalent to `ciphertext ^ key = plaintext`. We can see here why this cipher is symetric.

Note that if our key is more than 1 byte long, we just xor it repetitively. Example with the key `YES` :

```
plaintext  : I AM PLAINTEXT
xor with   : YESYESYESYESYE
```

Now that we have chosen our cipher, let's discover 2 popular modes of operation for block encryption.

## ECB

![Wikipedia ECB Representation](/ecb.png)

In this mode of operation, we split our plaintext data to 16 bytes chunks and we encrypt each one of them. Then we concat the ciphertexts to obtain the final ciphertext.

To recover the plaintext, we do the same operation but with the ciphertext as input.

### Challenge

You must decode this [file] by coding a little script. The only thing you should know is that the key is 3 bytes long.

As you may have notices, the main issue about ECB is that it keeps a part of the information because a 16 byte plaintext bloc is always encrypted to the same ciphertext. We can thus still observe some patterns in the data.

![Problem with ECB](/pb_ecb.png)

## CBC

CBC mode of operation introduces a new concept : the I.V. (Initialization Vector). It is used to add a new step to the encryption of a block. When each block is encrypted, the resulting ciphertext is used as the IV for the next block. Usually, the initial I.V. is set to a random value.

![Wikipedia CBC Representation](/cbc.png)

### Challenge

You can now solve the challenge made by Matthis Hammel for the SanthacklausCTF 2019.

![Matthis Hammel Challenge](/chall_cbc.png)

Download the challenge [here](/chall_files.zip).

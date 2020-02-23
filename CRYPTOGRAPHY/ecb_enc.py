import sys

if len(sys.argv) != 3:
    print("[-] Usage ./ecb_enc filetoencrypt outfilename")
    exit(1)
key = "A0E"
blocks = []
with open(sys.argv[1], "rb") as f:
    while True:
        block = f.read(16)
        out_block = b""
        if len(block) == 0:
            break
        if len(block) != 16:
            block += b"0" * (16 - len(block))
        for i in range(len(block)):
            out_block += bytes([block[i] ^ ord(key[i % len(key)])])
        blocks.append(out_block)
with open(sys.argv[2], "wb") as f:
    for i in blocks :
        f.write(i)

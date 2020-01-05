import sys

if len(sys.argv) != 3:
    print("[-] Usage ./ecb_dec encfile outfile")

# get the key (we know it's 3 bytes long and that it's a GIF file)
with open(sys.argv[1], "rb") as f:
    enc = f.read(3)
    file_format_first_bytes = b"GIF"
    key = b""
    for i in range(len(file_format_first_bytes)):
        key += bytes([enc[i] ^ file_format_first_bytes[i]])
    print(f"[+] Key is {key}")

dec_blocks = []
with open(sys.argv[1], "rb") as f:
    while True:
        enc = f.read(16)
        if len(enc) == 0:
            break
        dec = b""
        for i in range(len(enc)):
            dec += bytes([key[i % len(key)] ^ enc[i]])
        dec_blocks.append(dec)
with open(sys.argv[2], "wb") as f:
    for i in dec_blocks:
        f.write(i)


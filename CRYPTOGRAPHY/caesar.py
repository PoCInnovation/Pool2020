import sys

if len(sys.argv) != 2:
    print("[-] Usage ./caesar encrypted")
    exit(1)
enc = sys.argv[1]
res = []
for i in range(26):
    res.append("")
    for c in enc:
        if not c.isalpha():
            res[-1] += c
            continue
        res[-1] += chr(ord('A') + (ord(c) - ord('A') + 1 + i) % 26)
common_english_words = set(["THE", "THIS", "TO", "A", "AN"])
for i in res:
    if set(i.split()) & common_english_words:
        print(i)

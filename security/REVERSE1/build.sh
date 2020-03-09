# 32 bits
gcc -m32 -o binaries/reflexes reflexes.c
# 32 bits
gcc -m32 -o binaries/translate_me translate_me.c
# 32 bits
gcc -m32 -o binaries/iamfullrandom iamfullrandom.c
# 64 bits + stripped
gcc -s -o binaries/stripped stripped.c
# 64 bits
gcc -o binaries/arena arena.c

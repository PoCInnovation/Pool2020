#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main(void)
{
    char buffer[] = "PoC{T00-_-eZ!!!!!}";
    char input[100];
    int check = read(0, input, 100);

    if (strcmp(input, buffer) == 0) {
        printf("GG you found me !\n");
        return 0;
    }
    printf("Nope.\n");
    return 1;
}




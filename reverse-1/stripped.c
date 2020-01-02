#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[])
{
    char buffer[] = "IamTh3Fl4g<3!";

    if (argc != 4)
        return 1;
    for (int i = 0; i < strlen(buffer); i += 1)
        buffer[i] += 1;
    if (strcmp(argv[3], buffer) == 0) {
        printf("OMG A HACKER KILLED ME !\n ggwp\n");
        return 0;
    }
    return 1;
}

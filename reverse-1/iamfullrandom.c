#include <string.h>
#include <time.h>
#include <stdlib.h>
#include <stdio.h>

int main(int argc, char *argv[])
{
    const char charset[] = "HelloW0rld,DoUKnowDynamicAnalysis?";
    const int len = strlen(charset);
    char buffer[8];

    if (argc != 2 && strlen(argv[1]) != 8)
        return 1;
    srand(time(NULL) + 0x42);
    for (int i = 0; i < 8; i += 1) {
        buffer[i] = charset[rand() % len];
    }
    for (int i = 0; i < 8; i += 1) {
        if (buffer[i] != argv[1][i]) {
            printf("You failed !\n");
            return 1;
        }
    }
    printf("Such a xXHack3rXx\n");
    return 0;
}

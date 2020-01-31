#include <string.h>
#include <time.h>
#include <stdlib.h>
#include <stdio.h>

static int compare(char *s1, char *s2)
{
    for (int i = 0; i < 100; i += 1) {
        if (s1[i] != s2[i]) {
            return 0;
        }
    }
    return 1;
}

int main(int argc, char *argv[])
{
    const char charset[] = "HelloW0rld,DoUKnowDynamicAnalysis?";
    const int len = strlen(charset);
    char res[100] = {};

    if (argc != 2) {
        dprintf(2, "Give me some password dude\n");
        return 1;
    }
    if (strlen(argv[1]) != 100) {
        dprintf(2, "ANSSI says that 100 chars passwords are good...\n");
        return 1;
    }
    res[1] = 'o';
    res[99] = '}';
    res[2] = 'C';
    res[0] = 'P';
    res[3] = '{';
    for (int i = 4; i < 99; i += 1) {
        res[i] = charset[i % strlen(charset)];
    }
    if (compare(argv[1], res)) {
        printf("Such a xXHack3rXx\n");
        return 0;
    }
    dprintf(2, "N0pe!\n");
    return 1;
}

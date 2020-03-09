#include <stdio.h>
#include <string.h>
#include <sys/ptrace.h>

int main(int argc, char *argv[])
{
    char buffer[] = "IamN0TTh3Fl4g<3";

    if (argc != 2) {
        printf("at least u tried...\n");
        return 1;
    }
    if (ptrace(PTRACE_TRACEME, 0, 1, 0) == -1)
    {
        printf("don't run gdb on me u foul\n");
        return 1;
    }
    for (size_t i = 0; i < strlen(buffer); i += 1)
        buffer[i] += 1;
    if (strcmp(argv[1], buffer) == 0) {
        printf("OMG A HACKER KILLED ME !\nggwp\n");
        return 0;
    }
    return 1;
}

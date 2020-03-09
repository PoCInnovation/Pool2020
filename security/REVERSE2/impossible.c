#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/utsname.h>

int main(void)
{
    struct utsname buf;

    if (uname(&buf) == -1) {
        printf("uname error");
    }
    if (strcmp(buf.sysname, "HackerOs") == 0) {
        printf("Now you're the real h4ck3r\n");
        return 0;
    }
    printf("Y0u n00B\n");
    return 1;
}

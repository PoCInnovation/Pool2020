#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <stdlib.h>
#include <fcntl.h>


static int boss(char *buffer, char *final_shit)
{

    if ((*buffer ^ 0) == 0 || *final_shit == 0)
        return 0;
    int len = strlen(buffer);
    if ((*buffer ^ len) == *final_shit)
        return boss(buffer + 1, final_shit + 1);
    return 1;
}

// PoC{R3ver53_!S_Ez!!}
static void step3(void)
{
    printf("\n\e[36m====================== CHAMP3 ======================\n");

    int fd = open("/tmp/secret/things.txt", O_RDONLY);
    if (fd == -1)
        return;
    
    char *buffer = calloc(20, sizeof(char)) ;
    if (buffer == NULL)
        return;

    ssize_t ret = read(fd, buffer, 20);
    close(fd);

    char final_shit[] = "D|QjB<xh~>9V)TY@~\"#|";
    int res = boss(buffer, &(final_shit[0]));
    if (res == 0)
        printf("\nWell you've won this arena. Here is your flag: %s\n", buffer);
    free(buffer);
}

// IDoS0m3PoC
static void step2(void)
{
    printf("\n\e[33m====================== CHAMP2 ======================\n");

    char xor_string[11] = "}!Nr_:\\\"N\'";
    char buffer[11];
    char result[11];
    printf("\nWhat is the flag ?\n");
    ssize_t ret = read(0, buffer, 10);

    if (ret != 10)
        return;
    int i = 0;
    while (i <= 10) {
        result[i] = xor_string[i] ^ buffer[i];
        i += 1;
    }
    if (strcmp(result, "4e!!oWor!d"))
        return;
    printf("\nYou're the first one to defeat me :(. You won't make it against the final boss though ! \"%s\"\n", result);
    step3();
}

// PoC<3
static void step1(const char *input)
{
    printf("\n\e[31m====================== CHAMP1 ======================\n");

    if (strlen(input) != 5)
        return;
    if (input[0] != 80)
        return;
    if (input[1] != 111)
        return;
    if (input[2] != 67)
        return;
    if (input[3] != 60)
        return;
    if (input[4] != 51)
        return;
    printf("\nArgh you found my flag, I will defeat you next time ! \"%s\"\n", input);
    step2();
}

int main(const int argc, const char *argv[])
{
    printf( "\e[31m     _______         __________        ______\n" \
            "\e[31m    |+++++++\\_     _/o++++++o++\\_    _/oss+++|\n" \
            "\e[35m     \\ssssss+o\\   /osso++++++os++|  |ooos++=+|\n" \
            "\e[35m __        |+oo|  |oo+|      |++o|  |ss+|\n" \
            "\e[33m|oss|      |o+s|  |++:|      |ss+|  |o+o|\n" \
            "\e[33m|+o+|_____/sso/              |o++|  |s+o|       ___\n" \
            "\e[32m|o+o++++++++o/               |+++|  |s++|      |s+:|\n" \
            "\e[32m|ossssssss+/                 |s+s|  |o+:|      |s+=|\n" \
            "\e[36m|ss+|                        /o+s|  |++:\\______/o++|\n" \
            "\e[36m|o+s|                  |oosss++o/    \\o+++++sss++:/\n" \
            "\e[36m|++:|                  |s++++ss/      \\ooo++++s:=/\n");
    if (argc != 2)
        return 1;
    step1(argv[1]);
    printf("\nYou're leaving the arena !\n");
}

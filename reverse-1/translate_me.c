#include <stdio.h>

static int i_do_stuff(const char *str)
{
    int i = 0;

    while (str[i]) {
        printf("%c", str[i]);
        i += 1;
    }
    printf("\n");
    return i;
}

int main(void)
{
    int a = 1;
    int b = 4;

    if (a + b == 5) {
        a = i_do_stuff("IamGroot<3");
    }
    else {
        a += 1;
    }
    return a;
}

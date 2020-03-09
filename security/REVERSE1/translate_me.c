#include <stdio.h>

int increment(int i)
{
    return i + 42;
}

int main(void)
{
    int a = 1;
    int b = 4;

    if (a + b == 5) {
        a = increment(a);
    }
    else {
        a += 1;
    }
    return a + b;
}

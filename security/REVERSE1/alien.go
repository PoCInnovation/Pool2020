package main

import (
    "os"
    "fmt"
)

func main() {
    if len(os.Args) != 2 {
        fmt.Printf("You should try something. Give me some args !\n")
        os.Exit(1)
    }
    if os.Args[1] != "Go{I4m-Wh4t-U-s33k}" {
        fmt.Printf("That's not the correct flag, try harder.\n")
        os.Exit(1)
    }
    fmt.Printf("You did it br0 ! Cong4tz !!!\n")
}

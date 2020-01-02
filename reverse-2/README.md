# Reverse Engineering with Cutter

GDB and PEDA are good tools but when we face complex / heavy programs, it's hard to make an efficient analysis.
That's why today we are going to learn how to use Cutter, a GUI tool built on top of [Radare2](https://github.com/radareorg/radare2)
This tool is great because it features :
* a clean and efficient interface
* a good integration of the Ghidra decompiler (a decompiler deduces the C code from the binary asm instructions). [Ghidra](https://github.com/NationalSecurityAgency/ghidra) was developped and released by the NSA.
* a built-in debugger

Download the .AppImage for Cutter and run it !

# 1 - ez-check

The challenge *ez-check* is pretty simple. Solve it using Cutter and take the time to discover the software and its various functionalities.

# 2 - impossible

Now we are going to learn how to patch a binary. Patching a binary means changing some instructions to change the behaviour of the program.
To patch a binary in Cutter, you have to :
* open the binary in write mode (the option must be set in the first popup window at the beginning of Cutter).
* make a right click on the C / asm code and go to Edit -> instruction to rewrite the instruction !
* then you can launch again your program and see the effect of your changes !

Depending on the size of the program and the impact of your changes, edition can take some time. Be patient !

Start analysing the *impossible* binary : first understand why it is called impossible, then solve the challenge !

# 3 - Craft

After all this reverse, you might want to hang out a little bit on this new Minecraft version. The problem is that it is licence protected...

Bypass the protections and start a game !

*N.B. : This is actually not Minecraft. The binary you are dealing with is a modified version of [Craft](https://github.com/fogleman/Craft), an open source Minecraft clone made in C and OpenGL.*

# End of Act Two

This second part was meant to introduce you to Cutter and binary patching. If you have any questions or contributions, contact me !


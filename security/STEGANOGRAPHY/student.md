# Steganography

Steganography is the art of hiding the fact that you are hiding something :). Basically this means that all the process of hiding data in a file (image, sound, pdf...) is steganography. In this workshop, we are going to learn some basic techniques to hide data ad reverse them to retrieve it.

# Before we start

To solve the challenges og this workshop, you will have to know some basic things on how files work.

## File formats

Let's take it from the beginning. Every documents, images, sounds ... can be stored in a file. A file contains data which must be used to render its content. The data organisation in a file is defined by its file format specifications (pdf, jpg, png, wav, zip ...).

Almost all the main file formats have some structural similarities :

* they start with a header describing the file : the size of its content, the targeted environments etc.
* the content which can be organised in various ways
* sometimes a end pattern, used to know where the parsers should stop

## File concatenation

Let's play out a little bit :
1. Take a png and a pdf file
2. Concatenate those files (png first)
3. What can you say about the resulting file ? How is it interpreted ? How can you know there is a pdf in it ? Try to use `file` and to open it in your web browser.
4. zip a file and append the zip archive at the end of the png-pdf file
5. use `binwalk` to extract the files

# Some steganography techniques that will be useful to know

## Filters

If in photoshop you create a fully white png file and you decide to add some text, only 0.1% less white, the difference is not visible. This is a widely used (in CTFs) steganography technique and hopefully, we have some cool tools to bypass it.
So if you think an image is using this technique, you may want to apply it some filters to see if some information is hidden.
You can use `stegsolve` for this !

## LSB

How to hide data in an image without using the filter technique and without concatenation ? With the widely used LSB technique, you can hide data in the image bits. LSB stands for Least Significant Bit which is the Bit which has the less importance on the final appearance of the image.

![LSB](images/lsb.png)

This technique consists of encoding the data to hide to base64 and wrote, bit per bit, to the byte describing the image content.

The disadvantage is that you can detect the use of this technique if you open the image at high contrast and check the pixel color : if it's not as uniform as it appeared to be, some content must be stored with the LSB technique.

# Read ? Steady ? Guess !!!

The challenge starts here :

![here](images/just-dig.png)

Retrieve as many flags as you can.

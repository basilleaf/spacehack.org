#! /usr/bin/env python
import PIL.Image as PIL
import re, os, sys, urlparse
"""
via https://pandemoniumillusion.wordpress.com/2008/05/04/quick-image-resizing-with-python/
What:
Resize all the jpg images in a directory

"""

basedir = 'new_images/'
image_dir = 'assets/img/'
keyword = 'seti'

all_sizes = {
    'xsmall': (450, 450),
    'small': (830, 830),
    'med': (950, 950),
    'large': (1200, 1200)
}

facebook = (885, 464)
twitter = (885, 474)

try:
    keyword = sys.argv[1]
except:
    print "You must specify a space probe name \n Or enter 'assets/img' to resize all images"
    exit(0)

JPG = re.compile(".*\.(jpg|jpeg)", re.IGNORECASE)

files = os.listdir(image_dir)
found_square = False
for file in files:
    if JPG.match(file):  # is this a jpeg
        f = image_dir.rstrip("/") + "/" + file
        if 'square' in f and keyword in f:  # is this the square version
            found_square = True
            for path, size in all_sizes.items():
                filename = f.split('/')[-1]
                img = PIL.open(f)
                img.thumbnail(size, PIL.ANTIALIAS)
                print("created: assets/img/%s/%s" % (path, filename))
                img.save("assets/img/%s/%s" % (path, filename))

if not found_square:
    print("could not find a square image for %s" % keyword)

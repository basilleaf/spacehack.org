#! /usr/bin/env python
import PIL.Image as PIL
import re, os, sys, urlparse
"""

"""

basedir = 'new_images/'
image_dir = 'assets/img/'
keyword = 'seti'

all_square_sizes = {
    'xsmall': (450, 450),
    'small': (830, 830),
    'med': (950, 950),
    'large': (1200, 1200),
}

social_size = (885, 464)

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

        if keyword in f:  # is this the square version

            # make the square images
            for path, size in all_square_sizes.items():

                if 'square' in f:
                    filename = f.split('/')[-1]
                    found_square = True
                    img = PIL.open(f)
                    img.thumbnail(size, PIL.ANTIALIAS)
                    img.save("assets/img/%s/%s" % (path, filename))
                    print("created: assets/img/%s/%s at size %s" % (path, filename, str(size)))

            # make the social iages
            if 'rectangle' in f:  # is this the square version
                filename = f.split('/')[-1].replace('_rectangle','')
                img = PIL.open(f)
                orig_width = img.size[0]
                orig_height = img.size[1]
                desired_width = social_size[0]
                desired_height = social_size[1]
                if orig_height < desired_height:
                    print "Could not create social image, rectangle image must be > %s " % str(desired_height)
                else:
                    img.thumbnail((orig_width, desired_height), PIL.ANTIALIAS)  # adjust the height to the social size first then we'll crop
                    width = img.size[0]
                    height = img.size[1]
                    half_the_width = width / 2
                    half_the_height = height / 2
                    half_desired_width = desired_width / 2
                    half_desired_height = desired_height / 2
                    box = (
                            half_the_width - half_desired_width,
                            half_the_height - half_desired_height,
                            half_the_width + half_desired_width,
                            half_the_height + half_desired_height
                            )

                    img_social = img.crop(box)
                    img_social.save("assets/img/social/%s" % filename)
                    print("created: assets/img/social/%s" % filename)

if not found_square:
    print("could not find a square image for %s" % keyword)

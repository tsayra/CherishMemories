Put your photos and videos for the three memory folders in here.

Then open script.js, find the FOLDERS array near the very top of the
file, and list each file's path inside the matching folder's "items"
array. For example:

  items: [
    { type: "image", src: "images/manuel-uy-01.jpg", caption: "Golden hour" },
    { type: "video", src: "images/manuel-uy-02.mp4",  caption: "" },
  ]

File names are just examples — name your files however you like, as
long as the "src" path in script.js matches exactly (including
capitalization).

Supported image types: .jpg, .jpeg, .png, .webp, .gif
Supported video types: .mp4, .webm, .mov (browser support for .mov varies)

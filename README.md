## Scavenger Hunt

### UX Overview

#### Brief

This website was created as a simple scavenger hunt game for an office entertainment evening.<br>
The objectives were to provide a fun game requiring users to travel around the local town looking for clues shown on the website which became 'active' based on the user's location.<br>
Clues are added to Google Maps markers and, if the user is close enough, the clue will be displayed on screen.<br>

#### User Stories

Users would need to:
- Easily see where clues were located in the vicinity;
- Understand if they were close enough to a clue to 'activate' it;
- Easily see their location relative to clues;
- Retrieve instructions on how to use the website;
- Scroll around the map to locate clues;
- Recentre on their location; and
- Zoom in and out to better see clue locations.

### Purpose

This website is designed as a simple one off interactive front end site for a specific entertainment event with a fun appearance. Users accessed the site from their mobile phones to 'follow' a map to locations of clues in the local area. Class map styling is used and an overlay for the appearance of an old-style parchment map.<br>

There is, intentionally, no option to add answers on screen because this application has a very specific purpose as part of a wider office 'game'. The site enables users to locate clues in the area, figure out the answer based on local landmarks or objects of note. The users would then return a central location to share their answers. The team with the most correct answers wins. <br>
The site comprises a single webpage with initial introduction overlay containing a single 'start' button. <br>
The styled ***Google Maps API*** is displayed with which users interact.<br>
The location of clues is shown by red flags. If a user is close enough to a flag the clue is displayed in a modal by the user clicking on the flag. If they are not close enough an error modal is displayed stating the user needs to move closer to the location.<br>
Buttons on the page enable the user to:

- Reset the zoom level to the intial start up value;
- Centre the map on their location; and
- Display a modal with instructions and help on how to play the game

Since users accessed the webpage on a variety of phones a 'signal' bar is displayed on the bottom left of the page to indicate to the user the accuracy of their GPS location to assist the user in determining whether the physical location of the clue may be in a wider area than that indicated by the map.<br>

An additional 'bonus' game is included. When a user clicks on a clue, if they are close enough, there is a chance that an icon would be revealed representing a member of the event team. Potentially users could reveal all 8 members. On revealing an icon a message is displayed and the icon saved at their bottom of the screen.

### How does it work
The front end is rendered using ***HTML*** and the Google Maps API accessed and rendered via ***jQuery***. A looping callback ensures the users location is updated every 5 seconds to track their movement in the area.

***jQuery*** is used for all button functionality.

Using ***jQuery*** localStorage commands the users' progress in locating clues and member icons was saved in case the user needed to or accidentally refreshed the webpage.

### Technologies Used ###
#### Styling:
Frontend is styled using ***Bootstrap*** framework.

#### Languages used:
***HTML5*** for page rendering

***CSS3*** for class styling

***jQuery*** for scripting functions

### Testing
No automatic testing was undertaken but the page was tested in the field repeatedly. In particular consideration was given to the distance a user needed to be located to a clue before it would be 'active'.

### Acknowledgements

#### Images credits:
Compass - https://www.kisspng.com/png-north-compass-rose-clip-art-old-compas-map-turkey-2201619/download-png.html

Dragon - https://ayoqq.org/explore/smaug-drawing-original/

Parchment overlay - https://pixabay.com/vectors/scroll-parchment-old-305402/

Map pin flags - adapted from https://pixabay.com/vectors/flag-place-location-marker-1295315/

#### Sound credits:
Pen click - http://soundbible.com/1970-Pen-Clicks.html

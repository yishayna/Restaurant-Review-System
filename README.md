# Restaurants Review System
## Design:
the project contains two parts Server and client.
### Server
The server has the model and the API.
#### The Model:       
Restaurant schema, which contains the details of singular restaurant = name and location
           user schema, which contains the details of singular user = first name, last name, username, password, location, picture
           review schema, which contains the details of singular review = user, restaurant, creation time, all the criteria of a review, picture
#### The API:
 User-related get requests and post requests.
           Restaurant-related requests.
## Client
           
The client has all the components of the frontend, which are:

	-Account
	-App
	-Profiles
	-Restaurants
	-Reviews
	-SignIn
	-SignUp
	-Utilities and Dropzone which are helpers
Each component oversees a different page of the project.

1.	The Account component:  
in charge of your profile in which each user can see their details, picture, reviews and can edit their reviews and username and location
2.	The Profiles component:   
in charge of showing all the users. each user can see all the other users and their location
3.	The Restaurants component: 
In charge of displaying all the current restaurants, The user can add restaurants, and restaurants can be sorted and shown by distance from the logged user and average score.     
4.	The Sign-in component:
in charge of the signing in of a user with a username and password.
5.	The Sign-up component: 
To sign up, a user with the first name, last name, username, password, location, photo. To add a user, you need to pick a unique user name. While typing a username, the system repeatedly checks if it's an available username or already taken.
6.	The Reviews component: 
in charge of showing all the system reviews; also, The user can add a new review. Reviews can be sorted by criteria and searched by name and searched by name, location, and average score.
## Flow:	
Press to the sign up to sign-up for the first time and enter all the required data.
	
Submit your sign-up, and if was successful, you will be redirected to the signing page.

Signing in with your username and password, and you will be redirected to your profile page.

On this page, you will see all your details, update the needed details, and all your reviews.

	
on the toolbar, you can press restaurants to see the restaurants, add a new restaurant with a name and a location, and add the restaurant right away to the restaurant table.
	

On the toolbar, you can press reviews to see the reviews. You should add a new review with all the needed data to add to your new restaurant.

	
after adding the review, it will show up right away


you can go back to your profile page (using the toolbar) and see your review.


you can press the profiles in the toolbar and get a full view of all the usernames and locations of the website's users.


sigh out of the system, and you can enter with a different user and see that all his additions are set.

### Additional features:
The project interfaces with google maps; while choosing a location on the website, a list of all available locations in the world will appear to the user.

Restaurants Review System
Design:
the project is divided to 2 parts Server and client .
Server
	the server has the model and the api.
the Model:
	restaurant schema which contains the details of singular restaurant = name and location
	user schema which contains the details of singular user = firstname ,lastname, username, password,location,picture
	review schema which contains the details of singular review = user,restaurant,creationtime,all the critiria of a review , picture
the api:
	user related get requests and posts requests.
	restaurant related requests.
Client
	the client has all the components of the frontend which are:
	-Account
	-App
	-Profiles
	-Restaurants
	-Reviews
	-SignIn
	-SignUp
	-Utilies and Dropzone which are helpers
	each components is in charge of a different page of the project.
	1.The Account component = in charge of your profile in which each user can see their details, picture,reviews and can edit their reviews and username and location
	2.The Profiles component =  in charge of showing all of the users. each user can see all of the other users and thier location
	3.The Restaurants component = in charge of displaying all of the current restaurants, restaurants can be added and restauratns can be sorted and shown by distance from logged user and by average score.	
	4.The Sign in component = in charge of the signing in of a user with username and password.
	5.The Sign up component = in charge of the signing up of a user with first name, last name, user name , password, location, photo. User can be added only if the username is available and checks automatically while typing a 	username.
	6.The Reviews component = in charge of showing all of the reviews in the system, also a new review can be added , reviews can be sorted by criteria and can be search by name and searched by name ,location and average score .
Flow :
-> Press to the sign up in order to signup for the first time and enter all the required data
-> submit you signup and if was successful you will be redirected to signing page
-> signing in with your username and password and you will be redirected to your profile page
-> on this page you will be able to see all of your details, update the needed details and all of you reviews.
-> on the toolbar you can press restaurants in order to see the restaurants , you can add a new restaurant with a name and a location, the restaurant will be added right away to the restaurant table.
-> On the toolbar you can press reviews in order to see the reviews, you should add a new review with all of the needed data , you can add to your new restaurant.
-> after adding the review it will show up right away
-> you can go back to your profile page (using the toolbar) and can see your review.
-> you can press the profiles in the toolbar and get a full view on all of the usernames and locations of users of the website.
-> sigh out of the system and you can enter with a different user and see that all his additions are set.

Additional features:
The projects interfaces with google maps, while choosing location in the website a list of all available location in the world will appear to the user .


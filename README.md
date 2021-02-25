# Project 3 - City Space

## Overview
For my third sei-project at General Assembly, we were given a week as a group project to build a MERN stack application that requires authentication. 

City Space is an application where we aim to encourage people to share and discover their favourite outdoor spots in London. Users can sign up and view various outdoor spots based on the tags provided upon registering or what location they want to look for on the map box. Users can click on all spots to have a detailed view of a specific space with the option to like, comment and view the profile of the creator as well as creating their own space and adding it to the collection on the explore page.

The app has been deployed with Heroku and Mongo-atlas is available [here.](https://cityspace-site.herokuapp.com/)


## Brief
* *Build a full-stack application* by making your own backend and your own front-end.
* *Use an Express API* to serve your data from a Mongo database.
* *Consume your API with a separate front-end* built with React.
* *Be a complete product* which most likely means multiple relationships and CRUD functionality for at least a couple of models.

## Collaborators
* Elsie Down - [Github](https://github.com/elsiedown)
* Ricky Cato - [Github](https://github.com/rickyc000)
* Edwyn Abi-Acar - [Github](https://github.com/Edwyn26)

## Getting Started
1. Access the source code via the ‘Clone or download’ button.
2. In CLI, run *`yarn`*.
on the root level to install dependencies for the backend.
3. In CLI,  navigate to client folder cd client and run the same command *`yarn`* to install dependencies.
4. Run command *`yarn dev-fullstack`* on the root level to run the program in your local environment.

## Technologies Used
### Front End

* JavaScript ES6
* React.js
* HTML5 & CSS3
* SASS
* React 
* React-Router-Dom
* Semantic-ui-react
* React-Slick
* Axios 
* Stone Cutter (react-stonecutter)


### Back End

* Node 
* MapBox
* Bcrypt
* Cloudinary 
* Express 
* Faker.js
* JsonWebToken
* Nodemon
* Mongoose
* Mongoose-unique-validator
* MongoDB


### Dev Tools

* Trello
* Git 
* GitHub
* Insomnia
* VSCode
* Eslint
* Git
* GitHub & Github Pages
* Google Chrome Dev Tools
* Google Fonts
* Heroku
* MongoDb Atlas

## Demonstration of the App Flow 

<img src="client/src/imagesReadMe/appFlow3.gif" />

#### Landing Page: 

* The user is prompted to find their favourite spots. 
* Log in and register buttons on the navbar with a slide and fade in animation.

#### Sign Up  and LogIn Page:

* The user has to fill the signup form which requires them to select the tags they prefer so what kind of space they prefer. 
* There is also a link to the login page if they have an account already.

#### Index page:

* If the user is signed in there is a welcome banner with there username next to it if logged in.
* A featured list of the best spots in London.
* A map box of all spots on the map of London.
* If the user is logged in there is also a recommendation carousel that displays recommended spots based on their tag preferences.

#### Detailed view of Space:

* The user can see the space description with the tags it related to.
* Toggle over to the map view and the photo of the space in case the user wanted to see where it is located.
* User can like, comment or view the creators profile if logged in.
* Similar Places feature that shows a carousel of similar spaces beneath.

#### Profile Page or User Profile:

* The user and toggle viewing its liked spaces or created spaces with the option to create a space.

#### Explore Page:
 
* A index view of all spaces and a filtered list of the spaces based on category with the name and number of likes of each space when hoovered.
* Transitions to different categories upon clicking a different category.

## Process

### Plan

<img src="client/src/imagesReadMe/Screenshot 2021-02-11 at 22.52.50.png"/>
<img src="client/src/imagesReadMe/Screenshot 2021-02-11 at 22.53.05 copy.png"/>
 
We first started brainstorming ideas trying to find out what concept we wanted to revolve our app around and voting on ideas we liked the best since we were a group of 4.

Once we came up with a concept of sharing your favourite outdoor spots in London we opened a shared google document to further elaborate on a concept with a brand image and solidifying the direction we were going in.

We used this planning document to list out dependencies we were planning on using as we were asked not to use the Bulma CSS framework for this project specifically.

We also started drafting out the models and requests we will be making on the back end. 

<img src="client/src/imagesReadMe/Screenshot 2021-02-11 at 23.10.56.png" />
<img src="client/src/imagesReadMe/Screenshot 2021-02-11 at 23.11.09.png" />


### Division of Work

<img src="client/src/imagesReadMe/Screenshot 2021-02-11 at 23.47.48.png"/>


For the division of work, we used Trello to label certain tasks as there were so many things to cover on the front end, back end as well as the app’s features. 

Since we were 4 there was a lot of tasks that we assigned 2 people to pair coded a specific component or feature to save time or One person would work on a page and another person would build on the code pushed later on allowing us to utilise Github with a large number of commits.

As a group, we all decided that everyone would be working on the back-end as well as the front-end so we could learn what was going on ourselves. Also, we decided that everyone would contribute at least 15 seeds of different spots with different categories outside of the time we spent working together. 

Labels were used to assign tasks during the early stages of the project.
So they were all put in the done section.


### Back End (Comments and Liking Functionality)

On the Back End, I worked on adding the comments and favourite by to the CitySpace model.

```
export const tagCategories = [
  'Riverside Spot',
  'Architecture',
  'Art & Design',
  'Food & Drink',
  'Peace & Quiet',
  'Lively',
  'Mother Nature',
  'Sports & Leisure'
] 

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true  },
}, {
  timestamps: true,
})

const citySpaceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 800 },
  image: { type: String, required: true },
  location: { type: Object, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true  },
  comments: [commentSchema],
  favouritedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true  }], // * Literally just an array of the user ids now
  tags: [{ type: String, required: false }],
})

```



### Seeds and Users

Since our web app revolved around a community of users interacting with different spaces.  We needed to create faker users. This was to populate the web page for when real users interact with the owners that have spaces they liked or commented on. This required the 3rd party dependency to provide faker users and details faker.js. To use  *Faker.js*  we needed to assign our fake users to different spaces we had made as seeds. Also, assign favourite tags and favourited spaces to each fake user so when a user selects a random profile it is filled with data on the profile page not empty.

I was able to do this with Ricky on the db/seeds.js file 

```
const spaceDataWithOwners = spaceData.map(space => {
      const randomIndex = Math.floor(Math.random() * users.length)
      space.owner = createdUsers[randomIndex]._id
      const numberOfFavourties = Math.floor(Math.random() * 4)
      const favourites = []
      for (let i = 0; i <= numberOfFavourties; i++) {
        const randomFavouriteIndex = Math.floor(Math.random() * users.length)
        favourites.push(createdUsers[randomFavouriteIndex]._id)
      }
      space.favouritedBy = favourites
      return space
    })

```



### Front End 

On the front end, I was tasked with Edwyn in hooking up the index page with the backend seeds and users.  As well as using the 3rd party package *react-slick* for the slider feature.

<img src="client/src/imagesReadMe/project3Slider.gif"/>

```
return (
    <SimpleReactLightbox>
      <div className="slider-container">
        <h4 className="featured-list">Featured</h4>
        {spaces ?
          // <SRLWrapper options={options}>
          <Slider {...settings}>
            {mySpaces.map(space => (
              <div className="card" key={space._id}>
                <div className="homepage-card-name">
                  
                  <div className="ui-card img-wrapper">
                    <Link to={`/spaces/${space._id}`}>
                      <img key={space._id} className="images" src={space.image} />
                      <div className="homepage-card-overlay">
                        {space.name}
                      </div>
                    </Link>
                  </div>

                </div>

              </div>
            ))}
          </Slider>
          // </SRLWrapper>
          :
          <h2 className="title has-text-centered">
            {hasError ? 'There was An Error' : '...loading '}
          </h2>
        }
      </div>
    </SimpleReactLightbox >
  )
}


export default SpaceSlider

```

Since there were so many features on the index page we split a lot of our features into their own component to help in dividing the work without causing conflicts.

```
function SpaceIndexView() {
  const isLoggedIn = isAuthenticated()

  return (
    <>
      <div className="ui container fly-in no-padding">
        <WelcomeBanner />
        <div className="homepage-main-content-wrapper">
          <div className="homepage-slider-section">
            <SpaceSlider />
          </div>
          {/* { isLoggedIn &&
        <ReccomendedSlider 
        />
      } */}
          <div className="mapbox-wrapper">
            <SpaceIndexMap />
          </div>
          {isLoggedIn &&
            <ReccomendedSlider
            />
          }
          <SpaceIndexCategories />
        </div>
        <footer className="footer">
          <p>&copy; CitySpace</p>
          <p>2020 </p>
        </footer>
      </div>
    </>
  )
}
export default SpaceIndexView

```



### Styling and Animations

Since we had an idea of the theme with the font Ricky chose on google fonts and the logo he made as well we kept the same theme throughout the website with the title with the use of semantic-ui-react as the structure having the landing page and features of buttons on the navbar.

I personally worked on the use of react-stonecutter for the categories page to show all the spaces as cards with animations and transitions on click for each category. 

<img src="client/src/imagesReadMe/project3ExplorePage.gif"/>

```
<div className="grid-wrapper">
          {spaces ?
            <CSSGrid
              component="div"
              columnWidth={290}
              gutterWidth={50}
              gutterHeight={50}
              layout={layout.pinterest}
              duration={800}
              columns={3}
              easing="ease-out"
            >
              {filterSpaces(category).map((space =>
                <div key={space.name} itemHeight={270}>
                  <Link
                    to={`/spaces/${space._id}`}
                    key={space.name}>
                    <div key={space.name} itemHeight={270} className="category-card">
                      <img className="category-card-image" src={space.image} />
                      <div className="category-card-content">
                        <div className="ui header category-card-header">
                          {space.name}
                        </div>
                        <div className="label-heart-wrapper">
                          <div value={space._id} className="point yellow">
                            <Icon name="heart" />
                            {space.favouritedBy.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </CSSGrid>
            :
            <div>Loading</div>
          }
        </div>
```

I also added the hover effect for each card on the explore page to show the name for the space with the number of likes using the before pseudo-element.
In addition to the explore page, I added keyframe animations to all the pages the ease the transition onto each page to create a smoother feel to the app. 

```
// *ANIMATIONS


//* ANIMATION, SLIDE IN, FOR LOGIN PAGE, PROFILE AND SHOWPAGE
.slide-in{
  animation: slide-in 1.3s ease;
}

//USED ON FEATURE PAGE AND SIGNUP PAGE 

@keyframes fly-in {
  0% {
    opacity: 0;
    transform: translateY(300px);
  }
  60% {
    opacity: 0;
    transform: translateY(300px);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
}

// // LOG IN PAGE
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

//LOG IN PAGE PROFILE AND SHOWPAGE
@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  60% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
      opacity: 1;
      transform: translateX(0);
  }
}

// INDEX PAGE 
@keyframes change {
  0%{background-position:30% 0%}
  50%{background-position:71% 100%}
  100%{background-position:30% 0%}
}

```


### Deployment

For deployment, we had to set up an account with [MongoDb Atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_united_kingdom_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624581&gclid=Cj0KCQiAyJOBBhDCARIsAJG2h5cNTIp5veBpGsfyjBbyO2wsmBeHDXw72hRE_wZw4nxiBw7U8C0GxKMaAiVAEALw_wcB) to run our database when the website is live on [Heroku](https://dashboard.heroku.com/apps)

## Challenges
* *Team Git*: Using Git as a team was a completely new experience. The process of creating branches and pushing your work to the development branch for my other teammates pull required a lot of commands sent on the terminal that caused errors with the slightest mistake. Dealing with it was definitely something that required adjustment, but with help from my team, we were able to guide each other through it so there were no major errors or detrimental conflicts in our code.


## Wins
* *Working with my Team*: I loved working with all my team members we had the patience to help each other whenever and the work rate to give an extra hour I couldn’t have been happier with the group of individuals I worked with.
* *Website design*: We came together with a well thought out concept that showed throughout the website the styling was consistent and professional which we target we set for ourselves as a group.
* *Populating Users with data and seeds*: A major part of our website was making the website feel like it had been used and it wasn’t an unshared site so applying the map and for loop, methods to populate the user data helped to make it a Professional site.
* *Utilising react-stonecutter*: Being able to use the react stonecutter dependency for the grid helped add multiple animations to the explore page improving the aesthetics of the site and helped me build from the animations I was able to do on project 2. 

## What I Learned 
* *Utilising React 3rd Party packages:* I learnt how to read react package documentation to use their dependency how I wanted with dependencies such as Semantic, react-slick, react-stonecutter and Fakerjs.
* *MERN stack application*: Being able to work on both the front end and the back end helped me improve my backend skills with Mongo, Node and Express as well as React.

## Future Features
* *Following other users*:  Adding followers to the user model is something we didn’t have enough time to allocate for but is a feature we wanted to add.
* *Current Location*: Users can see their current location relative to all the spaces around them so they could see which spaces were close to them.












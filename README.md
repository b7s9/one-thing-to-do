# One Thing to Do

![index.html page](https://user-images.githubusercontent.com/19176695/94201425-f73a7700-fe89-11ea-84aa-aeb611f2e8c4.png)

## Problem

Todo lists are a helpful way of organizing the tasks that you need and/or want to do, but for people with ADHD/ADD, it can often be very difficult to actually find the motivation to check an item off that list. When the list gets too long, it can feel especially overwhelming.

## Solution

One of the most effective means of self-motivation I've discovered is regular self-affirmations. By lifting your spirits, it's much easier to move that energy and apply it to something totally unrelated—like Newton's law of emotion or something.

This project is a webapp that requires you to say something nice about yourself every time you want to add a new item to your todo list. Rather than view all of your todos at once in a daunting list, the todo viewer picks a random one to show you, but also picks a random affirmation to display right beneath it. This way the user experience is more focused and kinder than a standard to do list 💚

## Usability testing instructions

### Mobile installation

1. Go to [one.b7s9.com](https://one.b7s9.com)
1. Save to home screen (available in "share" menu on ios)
1. Open the app
1. Turn off wifi & cellular (if this breaks the experience, you may turn internet back on)
1. Complete testing criteria

### Desktop installation

1. Go to [one.b7s9.com](https://one.b7s9.com)
1. Turn off wifi & ethernet (if this breaks the experience, you may turn internet back on)
1. Complete testing criteria

### Testing criteria

1. Add 3 or more entries
1. Refresh viewer until you have seen all entries
1. Complete a todo item

~~Complete Usability Test questionnaire~~ Alpha usability testing is complete. Submissions closed until Beta is ready for testing. You can read my analysis of the Alpha test on [my blog](https://blog.b7s9.com/home/ottd-alpha-feedback)


## Developer Installation

Progressive Web Apps must be served over https, so you will need to serve the project on localhost, as opposed to just opening `index.html` in your browser. I've included an npm package for your convenience, or you can use your own e.g. MAMP.

```bash
git clone https://b7s9/one-thing-to-do.git
cd one-thing-to-do
npm install
npm start
```

if you haven't already done so, install [node/npm LTS](https://nodejs.org/en/)

1. clone this project locally
1. switch into this project's directory
1. install this project's dependencies
1. start the development server, available on http://localhost:8080

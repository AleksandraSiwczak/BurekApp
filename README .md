# Animal shelter managments system - BurekApp

### Index of Contents

- [Introduction](#introduction)
- [Back-end](#back-end)
- [Add Pet Form](#add-pet-form)
- [Animals List](#animals-list)
- [Adopted Animals List](#adopted-animals-list)
- [Calendar](#calendar)

ADRES STRONY
To log into app and calendar type:

- login: burekApp@gmail.com
- password: burekApp!23

### Introduction

The application was created to facilitate the management of shelters for homeless animals. Our goal was to create a simple and user-friendly app. The basic functionality is a database thanks to which information about animals can be constantly updated and changed as needed.

The user can add information about animals along with their photos to external database. Animals data can be held in list of animals currently located in our shelter or can be added to list of adopted animals. User can edit those records as well as delete them.

Last feature of this app is calendar linked to google account created for this project, events can be added inside google calendar and are displayed inside out application.

### Back-end

The data storage of our app is based on Firestore database which allows communication between the server and website.

There are two dedicated databases that contain information and photos of animals. Database update can be done from the Add Pet Form panel.

Thanks to the integration with the Google calendar, the user can view current events. This function has been configured by synchronizing with the Google calendar API.



### Add Pet Form

The panel allows you to add animals to the database.
The application is blocking the addition of animal details without completing the entire form, which reduces the possibility of errors.
Thanks to the clear graphic form, you can easily evaluate the animal's behavior.

<img src="./public/Screenshot 2022-02-10 at 19.42.53.png" />

### Animals List

The list of animals in the shelter shows graphically the data that is added via the Add Pet tab. The bars on the label allow the user to instantly add pet to adopted list, edit an existing record and remove it from the database.

<img src="./public/Screenshot 2022-02-11 at 10.39.23.png" />

### Adopted Animals List

In the details of adopted animals, you will find a button that will allow you to return the animal to the list of animals in the shelter.The details of animals also include a button for adding an animal to the list of adopted animals.

<img src="./public/Screenshot 2022-02-11 at 10.40.30.png" />

From both panels you can also edit the animal's card, add notes.

### Calendar

The calendar function has been created that each user has an easy and clear access to every event in the shelter. It uses google API and is linked to google account created for this project. User can add evevnts from google calendar and they are being displayed inside out application callendar that uses FullCalendar package.

<img src="./public/Screenshot 2022-02-10 at 19.41.05.png" />

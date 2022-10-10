
import Route from '@ioc:Adonis/Core/Route'



Route.resource('/pets', 'PetsController').apiOnly()

Route.resource('/shelter', 'ShelterController').apiOnly()

Route.get('/petsByShelter/:keyword', 'ShelterController.petsByShelter')





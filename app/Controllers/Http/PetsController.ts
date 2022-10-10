import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pet from 'App/Models/Pet'
import { schema } from '@ioc:Adonis/Core/Validator'
import BaseController from './BaseController'


export default class PetsController extends BaseController{
    public async index({ response }: HttpContextContract) {
        try {
             const pets = await Pet.all()
             return this.sendResponse(response,'Querried successfull', pets)     
        } catch(error) {
            return this.sendError(response, error, [])
        }
    }


    public async store({ request, response }: HttpContextContract) {
        
        const newPetSchema = schema.create({
            name: schema.string({ trim: true, }),
            shelterId : schema.number(),
            dob: schema.date({
                format: 'yyyy-MM-dd'
            }),
            
        })
        const
            payload = await request.validate({
                schema: newPetSchema,
                messages: {
                    "name.string": "Value is not a valid string",
                    "dob.date": "Enetr valid date format - YYYY-MM-DD",

                }
            })
        
        const pet = await Pet.create({
            name: payload.name,
            dob: payload.dob,
            shelterId: payload.shelterId
        })
        response.status(201)
        return pet
    }
 
    
    public async show({params}: HttpContextContract) {
        return Pet.findByOrFail('id',params.id)
    }
    
    public async update({ params, request }: HttpContextContract) {
         
        const body = request.body()
        const pet = await Pet.findByOrFail('id', params.id)
        pet.name =body.name
        
        return pet.save()
    }
    public async destroy({ params}: HttpContextContract) {
        const pet = await Pet.findByOrFail('id', params.id)

       // response.status(204)
        
        await pet.delete()
        return pet
    }

}



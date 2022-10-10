import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shelter from 'App/Models/Shelter';
import BaseController from './BaseController';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
//import { UserFactory } from 'Database/factories';


export default class ShelterController extends BaseController {
    public async index({ response }: HttpContextContract) {
        try {
            const shelters = await Shelter.all()
            return this.sendResponse(response, 'Query successfull', shelters)
        } catch (error) {
            return this.sendError(response, error, [])
        }
    }


        public async petsByShelter({ response, params}: HttpContextContract) {
        try {
            const petsByShelterID = await Shelter.query().where('id', params.id).preload('pets').first()
            // let shelter = await Shelter.query().where('name', 'like', '%' + params.keyword + '%')
            //     .orWhere('telephone', 'like', '%' + params.keyword + '%')
            
            return this.sendResponse(response, 'Query successfull', petsByShelterID)
        } catch (error) {
            return this.sendError(response, error, [])
        }
    }




    public async store({ request, response }: HttpContextContract) {
        

        const shelterSchema = schema.create({
            name: schema.string(),
            address: schema.string(),
            website_url: schema.string(),
            telephone: schema.string([
                rules.unique({ table: 'shelters', column: 'telephone' }),
                rules.maxLength(10)
            ]),


        })

        const validatedData = await request.validate({
            schema: shelterSchema,
            messages: {
                'required': 'The {{field}} is required to create a shelter',
                'telephone.maxLength': 'Phoone number must not exceed 10 digits',
                'telephone.unique': 'Phoone number already '
            }
        })

        try {

            const shelter = await Shelter.create(validatedData)

            return response.created({
                status: '201',
                message: 'Shelter created successfully',
                data: shelter,
            });
            
        } catch (error) {
            
            return response.created({
                status: '500',
                message: 'Shelter was not successfully created',
                data: [],
            });
        }
        

    }
    

    

  
    public async show({ params,response }: HttpContextContract) {

        try {
            const shelter = Shelter.findByOrFail('id', params.id)
            return this.sendResponse(response, 'Query successfull', shelter)

        } catch (error) {
            return this.sendError(response, error, [])
        }
    }


    public async update({ params, request, response }: HttpContextContract) {
         
        //const body = request.all()

        const shelterSchema = schema.create({
            name: schema.string.optional(),
            address: schema.string.optional(),
            website_url: schema.string.optional(),
            telephone: schema.string.optional([
                rules.unique({ table: 'shelters', column: 'telephone' }),
                rules.maxLength(10)
            ]),


        })

        const validatedData = await request.validate({
            schema: shelterSchema,
            messages: {
                // 'required': 'The {{field}} is required to create a shelter',
                'telephone.maxLength': 'Phone number must not exceed 10 digits',
                'telephone.unique': 'Phoone number already '
            }
        })

        try {
            
            const shelter = await Shelter.findByOrFail('id', params.id)  
            

            if (!shelter) {
                 return this.sendError(response, 'Could not find Shelter by that iD', [])
            }
            
             shelter.merge({
                name: validatedData.name,
                address: validatedData.address,
                telephone: validatedData.telephone,
                websiteUrl:validatedData.website_url
            })

            await shelter.save()

            return this.sendResponse(response, 'contact updated successfully', shelter )
            
        } catch (error) {
            return this.sendError(response, 'Could not find Shelter by that iD', [])
        }   

    }
    public async destroy({ params }: HttpContextContract) {
        const shelter = await Shelter.findByOrFail('id', params.id)

        // response.status(204)
        
        await shelter.delete()
        return shelter
    }
}
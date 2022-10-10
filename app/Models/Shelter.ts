import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pet from 'App/Models/Pet'


export default class Shelter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name?: string
  
  @column()
  public address: string
  
  @column()
  public telephone: string
  
  @column()
  public websiteUrl:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @hasMany(() => Pet)
  public pets: HasMany<typeof Pet>
}

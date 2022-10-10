import { DateInput, DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Shelter from './Shelter'

export default class Pet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public shelterId:number

  @column()
  public name: string
  
  @column.date()
  public dob:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Shelter)
  public shelter: BelongsTo<typeof Shelter>
  
}

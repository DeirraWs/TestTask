import {Table, Column, Model, DataType} from 'sequelize-typescript';

export interface IAllCountries {
  countryCode: string;
  name: string;
}

@Table({
  tableName: 'countries',
  timestamps: false,
})
export class Country extends Model<Country,IAllCountries>{

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  countryCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;
}
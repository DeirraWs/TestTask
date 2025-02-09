import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface ICountryFlag{
  countryName: string;
  flagURL: string;
}


@Table({
  tableName: 'countries-flag',
  timestamps: false,
})
export class CountryFlag extends Model<CountryFlag,ICountryFlag> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  countryName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  flagURL: string;
}
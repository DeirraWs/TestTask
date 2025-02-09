import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface IPopulationCount{
  countryName: string;
  year: number;
  value: number;
}

@Table({
  tableName: 'population-counts',
  timestamps: false,
})
export class PopulationCount extends Model<PopulationCount,IPopulationCount> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  countryName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  value: number;

}

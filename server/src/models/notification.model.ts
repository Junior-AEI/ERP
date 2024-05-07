import { Table, Column, Model, DataType, PrimaryKey, IsIn, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Users from './user.model'

export const PATHCONCERNED = ['Documents', 'ITTickets', 'Etudes', 'Trésorerie', 'Notes de frais', 'Relecture']

@Table
export default class Notifications extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    notificationId!: number

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number

    @BelongsTo(() => Users)
    user!: Users

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string

    @IsIn([PATHCONCERNED])
    @Column({
        type: DataType.ENUM,
        values: PATHCONCERNED,
        allowNull: false
    })
    pathConcerned!: string
}

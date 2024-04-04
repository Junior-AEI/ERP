// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    IsEmail,
    IsDate,
    NotEmpty,
    PrimaryKey,
    HasMany,
    HasOne
} from 'sequelize-typescript'
import Members from './member.model'
import ProjectManagers from './projectManager.model'
import ProjectNotes from './projectNote.model'
import Documents from './document.model'
import Tasks from './task.model'
import Tokens from './token.model'
import Belongers from './belonger.model'
import ItTickets from './ItTicket.model'
import AccountExpenses from './expenseAccount.model'

@Table
export default class Users extends Model {
    @PrimaryKey
    @ForeignKey(() => Members)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    memberId!: number

    @BelongsTo(() => Members)
    member!: Members

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username!: string

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    lastLogin!: Date

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    mandateStart!: Date

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    mandateEnd!: Date

    @IsEmail
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    emailJE!: string

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    createdAt!: Date

    @IsDate
    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    updatedAt!: Date

    @HasMany(() => ProjectManagers)
    projectManager!: ProjectManagers

    @HasMany(() => ProjectNotes)
    projectNotes!: ProjectNotes

    @HasMany(() => Documents)
    document!: Documents

    @HasMany(() => Tasks)
    task!: Tasks

    @HasOne(() => Tokens)
    token!: Tokens

    @HasMany(() => Belongers)
    belonger!: Belongers

    @HasMany(() => ItTickets)
    itTicket!: ItTickets

    @HasMany(() => AccountExpenses)
    accountExepense!: AccountExpenses
}

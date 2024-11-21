'use client';
import { Dispatch, SetStateAction } from "react";
import { default as BulletinConfig } from "./bulletin";
import { default as ApplicationConfig } from "./application";
import { default as DinnerConfig } from "./dinner";
import { default as FishingConfig } from "./fishing";
import { default as MemberConfig } from "./member";
import { default as StatementConfig } from "./statement";
import { default as BoardConfig } from "./board";
import { default as MinuteConfig } from "./minute";
import { default as GenerateStatementSearch } from "./generateStatement";


export enum ColumnConfigs {
    Bulletin = "bulletin",
    Application = 'application',
    Dinner = 'dinner',
    Fishing = 'fishing',
    Member = 'member',
    Statement = 'statement',
    Board = 'board',
    Minute = 'minute',
    StatementGenerate = 'statementGenerate'
}

export function Columns(config: string, data: unknown[], setTableData: Dispatch<SetStateAction<unknown[]>>) {
    switch (config) {
        case ColumnConfigs.Bulletin:
            return BulletinConfig(data, setTableData)
        case ColumnConfigs.Application:
            return ApplicationConfig(data, setTableData)
        case ColumnConfigs.Dinner:
            return DinnerConfig(data, setTableData)
        case ColumnConfigs.Fishing:
            return FishingConfig()
        case ColumnConfigs.Member:
            return MemberConfig(data, setTableData)
        case ColumnConfigs.Statement:
            return StatementConfig(data, setTableData)
        case ColumnConfigs.Board:
            return BoardConfig(data, setTableData)
        case ColumnConfigs.Minute:
            return MinuteConfig(data, setTableData)
        case ColumnConfigs.StatementGenerate:
            return GenerateStatementSearch(data, setTableData)
        default:
            return [];
    }
}
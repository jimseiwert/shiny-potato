export interface Statement {
    id: string
    picture: string
    name: string
    status: {
        id: number
        color: string
        name: string
    }
    memberType: {
        id: number,
        name: string
    },
    email: string,
    homePhone: string,
    cellPhone: string,
}
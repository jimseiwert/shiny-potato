export interface Member {
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
    personType: {
        id: number,
        name: string
    },
    email: string,
    homePhone: string,
    cellPhone: string,
}


export interface UniqueMember {
    memberId: number
    personId: number
    name: string
}

export interface MemberStatus {
    id: number
    name: string
    color: string
}

export interface MemberType {
    id: number
    name: string
}


export interface Address {
    id?: number,
    member?: number,
    name?: string,
    recipient?: string,
    line1: string,
    line2?: string | null,
    city: string,
    state: string,
    zip: string,
}
export interface MemberSearchResults {
    id: number;
    memberId: number;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    personType: {
        id: number;
        name: string;
    }
    status: {
        id: number;
        name: string;
        color: string;
    }
    type: {
        id: number;
        name: string;
    }
}
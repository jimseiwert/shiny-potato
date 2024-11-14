export interface Role {
    id: number;
    name: string;
}

export interface AssignedUserRole {
    id: number;
    memberId: number;
    picture: string;
    name: string;
    endYear: number | null;
}


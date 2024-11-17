import "server-only";
import { ISideBarItem } from "../../interfaces/sideBarItem";
import { House, Calendar, Files, ArrowRightCircle, ChartBar, CircleDollarSign, CookingPot, FileUser, Fish, IdCard, Newspaper, Users, User, Images, Paperclip } from "lucide-react";
import { Claim } from "@/server/enums/claims";
import { auth0 } from "@/lib/auth0"


export async function getUserMenu(): Promise<{member: ISideBarItem[], admin: ISideBarItem[]}> {
    const session = await auth0.getSession()

    if(session) {
    const user = session.user;

    const memberItems: ISideBarItem[] = [
        { name: 'Dashboard', href: '/member/dashboard', icon: House },
        { name: 'Forum', href: '/member/forum', icon: User },
        { name: 'Fishing', href: '/member/fishing', icon: Fish },
        { name: 'Events', href: '/member/events', icon: Calendar },
        { name: 'Documents', href: '/member/documents', icon: Files },
        { name: 'Gallery', href: '/member/gallery', icon: Images   },
    ]

    const adminItems: ISideBarItem[] = []

    if(user.claims) {

        if (user.claims.includes(Claim.ApplicationsRead)) {
            adminItems.push({ name: 'Applications', href: '/admin/applications', icon: FileUser });
        }
        if (user.claims.includes(Claim.BulletinsRead)) {
            adminItems.push({ name: 'Bulletins', href: '/admin/bulletins', icon: Newspaper });
        }
        if (user.claims.includes(Claim.BoardRead)) {
            adminItems.push({ name: 'Board', href: '/admin/board', icon: IdCard });
        }
        if (user.claims.includes(Claim.DinnersRead)) {
            adminItems.push({ name: 'Dinners', href: '/admin/dinners', icon: CookingPot });
        }
        if (user.claims.includes(Claim.LettersRead)) {
            adminItems.push({ name: 'Letters', href: '/admin/letters', icon: Paperclip });
        }
        if (user.claims.includes(Claim.MinutesRead)) {
            adminItems.push({ name: 'Minutes', href: '/admin/minutes', icon: Newspaper });
        }
        if (user.claims.includes(Claim.FishingRead)) {
            adminItems.push({ name: 'Fishing', href: '/admin/fishing', icon: Fish});
        }
        if (user.claims.includes(Claim.MembersRead)) {
            adminItems.push({ name: 'Members', href: '/admin/members', icon: Users });
        }
        if (user.claims.includes(Claim.StatementsRead)) {
            adminItems.push({ name: 'Statements', href: '/admin/statements', icon: CircleDollarSign});
        }
        if (user.claims.includes(Claim.ReportsRead)) {
            adminItems.push({ name: 'Reports', href: '/admin/reports', icon: ChartBar});
        }

        if (user.claims.includes(Claim.ConversionRun)) {
            adminItems.push({ name: 'Conversion', href: '/admin/conversion', icon: ArrowRightCircle});
        }
    }
    return {
        member: memberItems,
        admin: adminItems
    };
}
return {
    member: [],
    admin: []
};
}

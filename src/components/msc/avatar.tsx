import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AvatarImg({ image, name }: { image: string | undefined, name: string | undefined }) {
    return (
        <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>{name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
        </Avatar>
    )
}
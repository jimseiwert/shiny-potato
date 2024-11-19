/* eslint-disable react/display-name */
import { Claim } from '@/server/enums/claims';
import { useUser } from '@auth0/nextjs-auth0';
import React, { useEffect } from 'react';

const withProtectedComponent = (WrappedComponent: React.JSX.Element, RequiredClaim: Claim) => {
    return (props) => {
        return <Component {...props} />;
        const { user } = useUser()
        const [show, setShow] = React.useState<boolean>(false)


        useEffect(() => {
            if(user && user.claims.includes(RequiredClaim)) {
                setShow(true);
            }
        }, [user]);

        return show ? <WrappedComponent {...props} /> : null;
    };
};

export default withProtectedComponent;
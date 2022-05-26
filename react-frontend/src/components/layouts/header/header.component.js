import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import { Toolbar } from '@mui/material';
import {Typography} from "@mui/material";
import Box from '@mui/material/Box';
import Link from "@mui/material/Link";
import MuiAppBar from '@mui/material/AppBar';

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
    () => ({
        flexGrow: 1,
    }),
);

const StyledLinks = styled('div')(() => ({
    marginRight: 10,
}));

const rightLink = {
    fontSize: 16,
    color: 'black',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.05)',
        color: 'black'
    }
};

export default function Header() {
    return (
        <div>
            <AppBar position="fixed" sx={{color: 'grey'}}>
                <Toolbar>
                    <Typography>
                        <Link
                            underline="none"
                            href="/"
                            sx={{fontSize: 16,
                                color: 'black', '&:hover': {
                                    color: 'black'
                                    }
                                }}
                        >
                           Online shops reviews
                        </Link>
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>

                    <StyledLinks>
                        <Link
                            underline="none"
                            href="/login"
                            sx={rightLink}
                        >
                            <div>Login</div>
                        </Link>
                    </StyledLinks>

                    <StyledLinks>
                        <Link
                            underline="none"
                            href="/signup"
                            sx={rightLink}
                        >
                            <div>Signup</div>
                        </Link>
                    </StyledLinks>

                    <StyledLinks>
                        <Link
                            underline="none"
                            href="/users"
                            sx={rightLink}
                        >
                            <div>Users</div>
                        </Link>
                    </StyledLinks>
                </Toolbar>
            </AppBar>
        </div>
    );
}
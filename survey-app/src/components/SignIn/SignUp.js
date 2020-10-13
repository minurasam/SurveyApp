import React from 'react';
import SignUpContainer from "./SignUpContainer"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import './index.css'


export default function SignUp() {
    return (
        <div>
            <MuiThemeProvider>
                <SignUpContainer />
            </MuiThemeProvider>            
        </div>
    )
}




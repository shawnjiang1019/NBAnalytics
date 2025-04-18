"use client";

import SearchBar from "@/components/ui/searchBar";
import LogoutButton from "@/components/ui/logoutButton";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const landing = () => {
    return(
        <div>
            <LogoutButton/>
            <SearchBar/>

        </div>
    );
}
export default withAuthenticationRequired(landing, {
    onRedirecting: () => <div>Loading...</div>
});
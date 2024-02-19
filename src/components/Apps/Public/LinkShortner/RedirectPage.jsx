import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetLink } from "../../../../http/ShortenLink";

export default function RedirectPage() {
    const { linkId } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const link = await GetLink(linkId);
                if (link) {
                    window.location.href = link;
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error("Error fetching link:", error);
                setError(true);
            }
        };

        fetchData();
    }, [linkId]);

    if (error) {
        return <i><h1>Invalid link or your link might be expired</h1></i>;
    }

    return <h1>Redirecting</h1>;
}

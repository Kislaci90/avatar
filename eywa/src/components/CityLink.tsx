import {Link, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface CityLinkProps {
    city: string
}

export function CityLink({city}: Readonly<CityLinkProps>) {
    const navigate = useNavigate()

    const handleCityClick = () => {
        navigate({
            pathname: '/locations',
            search: `?cities=${encodeURIComponent(city)}`,
        });
    }

    return (
        <Typography variant="body1" sx={{mb: 1}}>
            <Link
                component="button"
                underline="none"
                onClick={() => handleCityClick()}
                sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        color: 'primary.dark',
                        textDecoration: 'underline',
                    }
                }}
            >
                {city}
            </Link>
        </Typography>
    );
}
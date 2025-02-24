import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import {gql, useQuery} from "@apollo/client";
import ShowerIcon from '@mui/icons-material/Shower';
import HomeIcon from '@mui/icons-material/Home';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import {Chip} from "@mui/material";

const GET_ALL_LOCATIONS_QUERY = gql(`
  query SearchLocations($count: Int!, $offset: Int!, $name: String!) {
    locations(count:$count, offset: $offset, name: $name) {
        content { 
            id 
            name 
            geom { 
                x 
                y 
            }
            address {
                city
            }
            contact {
                contactName
                phoneNumber
                email
            }
            properties
        }
        totalElements
        last
    }
  }
`);

const properties = ['SHOWER', 'FREE PARKING', 'CHANGING ROOM', 'COVERED AT WINTER']

const Result = () => {
    let offset = 3
    const theme = useTheme();
    const [name, setName] = useState("")
    const {data, loading, error, refetch, fetchMore} = useQuery(GET_ALL_LOCATIONS_QUERY, {
        variables: {
            name: name,
            count: 0,
            offset: offset,
        }
    });

    let sName

    //if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;


    return (
        <Box>
            <Box
                padding={2}
                width={1}
                component={Card}
                boxShadow={4}
                marginBottom={4}
            >
                <form noValidate autoComplete="off">
                    <Box display="flex" alignItems={"center"}>
                        <Box width={1} marginRight={1}>
                            <TextField
                                sx={{
                                    height: 54,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: "0 !important",
                                    },
                                }}
                                variant="outlined"
                                color="primary"
                                size="medium"
                                placeholder="Search a location"
                                onChange={(event) => sName = event.target.value}
                                value={sName}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Box
                                                component={"svg"}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                width={24}
                                                height={24}
                                                color={"primary.main"}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </Box>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box display={{xs: "none", sm: "block"}} marginRight={2}>
                            <Typography
                                color={"text.secondary"}
                                variant={"subtitle2"}
                                sx={{whiteSpace: "nowrap"}}
                            >
                                {data?.locations?.totalElements} Results
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                sx={{height: 54, minWidth: 100, whiteSpace: "nowrap"}}
                                variant="contained"
                                color="primary"
                                size="medium"
                                fullWidth
                                onClick={(event) => {
                                    refetch({
                                        name: sName
                                    })
                                    setName(sName)
                                }}
                                value={name}
                            >
                                Search
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
            <Box>
                {properties.map((item) => (
                    <Chip
                        key={item}
                        label={item}
                        component="a"
                        href=""
                        clickable
                        onClick={(event) => {
                            refetch({
                                name: sName
                            })
                            setName(sName)
                        }}
                        size={'medium'}
                        color={'primary'}
                        sx={{ marginBottom: 4, marginRight: 2 }}
                    />
                ))}
            </Box>
            <Grid container spacing={4}>
                {data?.locations?.content.map((item, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <Box
                            component={"a"}
                            href={""}
                            display={"block"}
                            width={1}
                            height={1}
                            sx={{
                                textDecoration: "none",
                                transition: "all .2s ease-in-out",
                                "&:hover": {
                                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                                },
                            }}
                        >
                            <Box
                                component={Card}
                                width={1}
                                height={1}
                                boxShadow={4}
                                display={"flex"}
                                flexDirection={"column"}
                                sx={{backgroundImage: "none"}}
                            >
                                <CardMedia
                                    image={`https://maps.googleapis.com/maps/api/staticmap?center=${item.geom.x},${item.geom.y}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:%7C${item.geom.x},${item.geom.y}&key=AIzaSyCsPzzlq_kJjn9AewRpos-wUSLkoswfp08&style=element:labels.text%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off`}
                                    title={item.name}
                                    sx={{
                                        height: {xs: 300, md: 360},
                                        position: "relative",
                                    }}
                                >
                                    <Box
                                        component={"svg"}
                                        viewBox="0 0 2880 480"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            color: theme.palette.background.paper,
                                            transform: "scale(2)",
                                            height: "auto",
                                            width: 1,
                                            transformOrigin: "top center",
                                        }}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z"
                                            fill="currentColor"
                                        />
                                    </Box>
                                </CardMedia>
                                <Box component={CardContent} position={"relative"}>
                                    <Typography variant={"h6"} gutterBottom>
                                        {item.name}
                                    </Typography>
                                </Box>
                                <Box flexGrow={1}/>
                                <Box padding={2} display={"flex"} flexDirection={"column"}>
                                    <Box marginBottom={2}>
                                        <Divider/>
                                    </Box>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                    >
                                        <Box display={"flex"} alignItems={"center"}>
                                            <Typography color="text.primary">
                                                {item.address.city}
                                            </Typography>
                                        </Box>
                                        <Box display={"flex"} alignItems={"right"}>
                                            {item.properties.includes("SHOWER") && (
                                                <ShowerIcon sx={{
                                                    marginLeft: 1,
                                                    marginRight: 1,
                                                    color: theme.palette.primary.main
                                                }}/>
                                            )}
                                            {item.properties.includes("CHANGING_ROOM") && (
                                                <HomeIcon sx={{marginLeft: 1, color: theme.palette.primary.main}}/>
                                            )}
                                            {item.properties.includes("FREE_PARKING") && (
                                                <LocalParkingIcon sx={{marginLeft: 1, color: theme.palette.primary.main}}/>
                                            )}
                                            {item.properties.includes("COVERED") && (
                                                <AcUnitIcon sx={{marginLeft: 1, color: theme.palette.primary.main}}/>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
                <Grid item container justifyContent={"center"} xs={12}>
                    <Button
                        fullWidth
                        variant={"outlined"}
                        size={"large"}
                        onClick={() => {
                            if (data?.locations?.last === false) {
                                offset += 3
                            }
                            return fetchMore({
                                variables: {
                                    name: name,
                                    count: 0,
                                    offset: offset + 3,
                                }
                            })
                        }
                        }
                        sx={{height: 54, maxWidth: 400, justifyContent: "space-between"}}
                        endIcon={
                            <Box
                                component={"svg"}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                width={24}
                                height={24}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </Box>
                        }
                    >
                        Load more
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Result;
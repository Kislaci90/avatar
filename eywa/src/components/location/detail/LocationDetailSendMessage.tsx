import {Box, Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";

export function LocationDetailSendMessage() {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 6}}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                        Send an email to the owner of this place, for getting more information, details
                        about booking, prices, etc.
                    </Typography>
                    <TextField multiline fullWidth rows="10"></TextField>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant="contained" size="large">Send</Button>
                </CardActions>
            </Card>
        </Box>
    );
}
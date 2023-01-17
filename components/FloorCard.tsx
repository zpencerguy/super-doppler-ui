import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export type MainFloorProps = {
    id: string;
    name: string;
    imageurl: string;
    price: Number;
    predictions: Number;
  };


const MainFloorCard: React.FC<{ collection: MainFloorProps }> = ({ collection }) => {
    const name = collection.name;
    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${collection.imageurl})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={collection.imageurl} />}
            <Box
            sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,.3)',
            }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                    sx={{
                        position: 'relative',
                        p: { xs: 3, md: 6 },
                        // pr: { md: 0 },
                    }}
                    >
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        {collection.name}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                        Floor price - {collection.price.toFixed(2)} SOL
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                        Number of predictions - {collection.predictions}
                    </Typography>
                    <Link variant="subtitle1" href="/create">
                        Make prediction...
                    </Link>
                    </Box>
                </Grid>
                {/* <Grid item xs>
                    {collection.name} ?
                </Grid> */}
            </Grid>
        </Paper>
        );
};

export default MainFloorCard;
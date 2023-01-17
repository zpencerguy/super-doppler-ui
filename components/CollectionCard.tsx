import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';


export type CollectionProps = {
  id: string;
  name: string;
  imageurl: string;
  price: Number
};


const CollectionCard: React.FC<{ collection: CollectionProps }> = ({ collection }) => {
  const theme = useTheme();

  return (
    <Card sx={{  display: 'flex', maxWidth: '50%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {collection.name}
          </Typography>
          {/* <Typography component="div">
            Floor price to move up or down?
          </Typography> */}
          <Typography component="div">
            {collection.price} SOL
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="up">
            {theme.direction === 'rtl' ? <NorthIcon /> : <NorthIcon />}
          </IconButton>
          <IconButton aria-label="down">
            {theme.direction === 'rtl' ? <SouthIcon /> : <SouthIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={collection.imageurl}
        alt="NFT collection image"
      />
    </Card>
  );
};


export default CollectionCard;

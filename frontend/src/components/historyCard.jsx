import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function HistoryCard({date,imageUrl,output}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='md:hidden px-3 my-3 border-[2px] rounded-xl'>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        // .toString().slice(0,15)
        title={`Date : ${date.toString().split("T")[0]}`}
        subheader={`Time : ${date.toString().split("T")[1].slice(0,-5)}`}
        // .toString().slice(16,25)
      />
      {/* <CardMedia
        component="img"
        height="154"
        image={imageUrl}
      /> */}
      <div className='flex justify-around'>
      <img src={imageUrl} alt="" className='max-h-[50vh]'/></div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <h1 className='text-xl font-bold'>Output : </h1>
          <div className='text-lg'>{output}</div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        
      </CardActions>
    </Card>
    </div>
  );
}

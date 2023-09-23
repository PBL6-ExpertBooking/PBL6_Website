import PropTypes from 'prop-types';
import { CardActions, Box, Button, Card, CardContent,CardHeader, Divider, Stack, SvgIcon, Typography } from '@mui/material';

export const PostCard = (props) => {
  const { post } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Typography
          align="start"
          gutterBottom
          variant="h4"
        >
          {post.title}
        </Typography>

        <Typography
          align="start"
          gutterBottom
          variant="body1"
          sx={{
            fontSize: '1.2rem'
          }}
        >
          <Typography
          align="start"
          gutterBottom
          variant="h5"
          sx={{
            display: 'inline-block',
            fontStyle: 'italic'
          }}
        >
          Address:
        </Typography> {post.address}
        </Typography>

        <Typography
          align="start"
          gutterBottom
          variant="body1"
          sx={{
            fontSize: '1.2rem'
          }}
        >
          <Typography
          align="start"
          gutterBottom
          variant="h5"
          sx={{
            display: 'inline-block',
            fontStyle: 'italic'
          }}
        >
          Price:
        </Typography> {post.price} VNĐ
        </Typography>

        <Typography
          align="start"
          gutterBottom
          variant="body1"
          sx={{
            fontSize: '1.2rem'
          }}
        >
          <Typography
          align="start"
          gutterBottom
          variant="h5"
          sx={{
            display: 'inline-block',
            fontStyle: 'italic'
          }}
        >
          Description:
        </Typography> {post.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 3 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            Post 2h ago
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <Button
          variant='contained'
          sx={{ width: 160, height: 40 }}
          >Show detail</Button>
        </Stack>
      </Stack>
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};

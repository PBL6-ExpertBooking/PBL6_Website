import PropTypes from 'prop-types';
import { CardActions, Box, Button, Card, CardContent,CardHeader, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import dayjs from 'dayjs';
import moment from 'moment';

export const PostCard = (props) => {
  const { jobRequest } = props;

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
          {jobRequest && jobRequest.title ? jobRequest.title : ""}
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
        </Typography> {jobRequest && jobRequest.address ? jobRequest.address : ""}
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
        </Typography> {jobRequest && jobRequest.budget ? jobRequest.budget : ""} VNĐ
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
        </Typography> {jobRequest && jobRequest.descriptions ? jobRequest.descriptions : ""}
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
            {jobRequest && jobRequest.createdAt ? `Post at ${moment(Date.parse(jobRequest.createdAt)).format('DD/MM/YYYY, h:mm:ss a')}` : "" }
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

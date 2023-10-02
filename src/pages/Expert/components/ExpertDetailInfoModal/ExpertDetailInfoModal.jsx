import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #ccc',
  boxShadow: 24,
  p: 4,
};

export default function ExpertDetailInfoModal({open, handleCloseModal, post}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleCloseModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%'
            }}
          >
            <CardContent>
              <Typography
                align="start"
                gutterBottom
                variant="h3"
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
                >Accept booking</Button>
              </Stack>
            </Stack>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
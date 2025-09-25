import React from 'react'
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack
} from '@mui/material'
import {
  CloudUploadOutlined,
  ImageOutlined,
  VideoLibraryOutlined,
  FolderOutlined,
  SearchOutlined,
  FilterListOutlined
} from '@mui/icons-material'

function MediaDashboard() {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Media Library
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and organize your media assets
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<CloudUploadOutlined />}
            sx={{ backgroundColor: 'var(--color-primary)' }}
          >
            Upload Media
          </Button>
          <Button
            variant="outlined"
            startIcon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterListOutlined />}
          >
            Filter
          </Button>
        </Stack>
      </Box>

      {/* Media Categories */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <ImageOutlined sx={{ fontSize: 48, color: 'var(--color-primary)', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Images
              </Typography>
              <Typography variant="body2" color="text.secondary">
                0 files
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <VideoLibraryOutlined sx={{ fontSize: 48, color: 'var(--color-secondary)', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Videos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                0 files
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <FolderOutlined sx={{ fontSize: 48, color: 'var(--color-success)', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Documents
              </Typography>
              <Typography variant="body2" color="text.secondary">
                0 files
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <CloudUploadOutlined sx={{ fontSize: 48, color: 'var(--color-warning)', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Recent Uploads
              </Typography>
              <Typography variant="body2" color="text.secondary">
                0 files
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No recent activity to display
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default MediaDashboard

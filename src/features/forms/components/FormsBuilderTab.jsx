import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Divider,
  Card,
  CardContent,
  CardActions
} from '@mui/material'
import {
  AddOutlined,
  DeleteOutlined,
  DragIndicatorOutlined,
  SaveOutlined,
  PreviewOutlined
} from '@mui/icons-material'

const questionTypes = [
  { value: 'text', label: 'Text Input' },
  { value: 'textarea', label: 'Long Text' },
  { value: 'number', label: 'Number' },
  { value: 'scale', label: 'Scale (1-10)' },
  { value: 'yesno', label: 'Yes/No' },
  { value: 'multiple', label: 'Multiple Choice' },
  { value: 'single', label: 'Single Choice' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' }
]

function FormsBuilderTab() {
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formCategory, setFormCategory] = useState('')
  const [questions, setQuestions] = useState([])

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: 'text',
      question: '',
      required: false,
      options: []
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ))
  }

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const addOption = (questionId) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      const newOptions = [...question.options, '']
      updateQuestion(questionId, 'options', newOptions)
    }
  }

  const updateOption = (questionId, optionIndex, value) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      const newOptions = [...question.options]
      newOptions[optionIndex] = value
      updateQuestion(questionId, 'options', newOptions)
    }
  }

  const deleteOption = (questionId, optionIndex) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex)
      updateQuestion(questionId, 'options', newOptions)
    }
  }

  const renderQuestionInput = (question) => {
    switch (question.type) {
      case 'multiple':
      case 'single':
        return (
          <Box sx={{ mt: 2 }}>
            {question.options.map((option, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(question.id, index, e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <IconButton
                  size="small"
                  onClick={() => deleteOption(question.id, index)}
                  color="error"
                >
                  <DeleteOutlined />
                </IconButton>
              </Box>
            ))}
            <Button
              size="small"
              startIcon={<AddOutlined />}
              onClick={() => addOption(question.id)}
              sx={{ mt: 1 }}
            >
              Add Option
            </Button>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Forms Builder
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create custom questionnaires and assessment forms
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Form Settings */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Form Settings
            </Typography>
            
            <TextField
              fullWidth
              label="Form Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="Wellness">Wellness</MenuItem>
                <MenuItem value="Medical">Medical</MenuItem>
                <MenuItem value="Physical">Physical</MenuItem>
                <MenuItem value="Nutrition">Nutrition</MenuItem>
                <MenuItem value="Psychological">Psychological</MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<SaveOutlined />}
                fullWidth
                disabled={!formTitle || questions.length === 0}
              >
                Save Form
              </Button>
              <Button
                variant="outlined"
                startIcon={<PreviewOutlined />}
                disabled={questions.length === 0}
              >
                Preview
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Questions Builder */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Questions ({questions.length})
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddOutlined />}
                onClick={addQuestion}
              >
                Add Question
              </Button>
            </Box>

            {questions.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  No questions added yet
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddOutlined />}
                  onClick={addQuestion}
                >
                  Add Your First Question
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {questions.map((question, index) => (
                  <Card key={question.id} sx={{ border: '1px solid var(--color-border-primary)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <DragIndicatorOutlined sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Question {index + 1}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                          size="small"
                          onClick={() => deleteQuestion(question.id)}
                          color="error"
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Question Text"
                            value={question.question}
                            onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                            placeholder="Enter your question..."
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <InputLabel>Question Type</InputLabel>
                            <Select
                              value={question.type}
                              onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                              label="Question Type"
                            >
                              {questionTypes.map(type => (
                                <MenuItem key={type.value} value={type.value}>
                                  {type.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      {renderQuestionInput(question)}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FormsBuilderTab

import React from 'react';
import '../styles/Note.css';
import { Button } from '@/components/ui/button';

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <Button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </Button>
    </div>
  );
}

export default Note;
